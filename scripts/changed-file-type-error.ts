import { execSync } from "child_process";
import ts from "typescript";
import path from "path";

const projectRoot = process.cwd();

// 경로를 프로젝트 루트 기준 상대 경로로 정규화
function normalizePath(filePath: string): string {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(projectRoot, filePath);
  return path.relative(projectRoot, absolutePath).replace(/\\/g, "/");
}

// CLI 인자로 base branch 받기 (CI에서 전달)
// 예: tsx scripts/changed-file-type-error.ts develop
// 기본값: origin/develop (GitHub PR의 base branch와 동일한 방식)
const baseBranchArg = process.argv[2];
const baseBranch = baseBranchArg ? `origin/${baseBranchArg}` : "origin/develop";

// 브랜치 존재 여부 확인 및 fetch
function ensureBranchExists(branch: string): void {
  try {
    execSync(`git rev-parse --verify ${branch}`, { encoding: "utf8", stdio: "ignore" });
  } catch {
    // 브랜치가 없으면 fetch 시도
    console.log(`⚠️  Branch ${branch} not found, fetching...`);
    try {
      const branchName = branch.replace("origin/", "");
      execSync(`git fetch origin ${branchName}:${branch}`, { encoding: "utf8" });
    } catch {
      // fetch 실패 시 에러
      throw new Error(`Failed to fetch branch: ${branch}`);
    }
  }
}

ensureBranchExists(baseBranch);
console.log(`🔍 Comparing with ${baseBranch}...`);
const changed = new Set<string>();
try {
  execSync(`git diff --name-only ${baseBranch}...HEAD -- '*.ts' '*.tsx'`, {
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean)
    .forEach((file) => {
      const normalized = normalizePath(file);
      changed.add(normalized);
    });
} catch (error) {
  console.error(`❌ Error comparing with ${baseBranch}:`, error);
  process.exit(1);
}

console.log(`🔍 ${changed.size} changed TS files found.`);

if (changed.size === 0) {
  console.log("✅ No changed TS files.");
  process.exit(0);
}

console.log("Compile TypeScript...");
const configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.app.json");
if (!configPath) throw new Error("tsconfig not found");

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, "./");
const program = ts.createProgram(parsed.fileNames, parsed.options);

const diagnostics = ts.getPreEmitDiagnostics(program);

const changedDiagnostics = diagnostics.filter((d) => {
  const { file, start } = d;
  if (!file || start === undefined) return false;

  // file.fileName을 프로젝트 루트 기준 상대 경로로 정규화
  const normalizedFileName = normalizePath(file.fileName);

  if (!changed.has(normalizedFileName)) return false;
  return true;
});

if (changedDiagnostics.length === 0) {
  console.log("✅ No TypeScript errors in changed files.");
  process.exit(0);
}

console.log(`\n❌ Found ${changedDiagnostics.length} TypeScript error(s) in changed files:\n`);

// TypeScript 포맷 호스트 설정
const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: () => process.cwd(),
  getNewLine: () => "\n",
};

changedDiagnostics.forEach((diagnostic) => {
  const message = ts.formatDiagnostic(diagnostic, formatHost);
  console.log(message);
});

console.log("\n");
process.exit(1);
