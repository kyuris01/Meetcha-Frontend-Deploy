import type { projectTheme } from "@/apis/memoir/memoirTypes";

const TEXT_COLORS = [
  "#ED7014",
  "#F98228",
  "#FDAE1D",
  "#BC2D02",
  "#FC6B02",
  "#DD5612",
  "#B2560D",
  "#FF9A66",
  "#EF820E",
  "#7F400B",
  "#EC9706",
  "#ED7117",
  "#891E01",
];
const BG_COLORS = [
  "#E8CCB6",
  "#F4EBE8",
  "#F4EEE9",
  "#FAD4B9",
  "#FCF0EB",
  "#FDDABF",
  "#FDF2EA",
  "#FDF4E9",
  "#FDF6E8",
  "#FFE4DB",
  "#FFEEE3",
  "#FFF2E8",
  "#FFF4ED",
  "#FFF8EB",
];

export function getProjectTheme(key: string | number): projectTheme {
  const s = String(key);
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  const i = hash % TEXT_COLORS.length;
  return { text: TEXT_COLORS[i], bg: BG_COLORS[i % BG_COLORS.length] };
}
