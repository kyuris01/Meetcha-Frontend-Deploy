// Project_container.tsx
import React, { useEffect, useState } from "react";
import styles from "./ProjectContainer.module.scss";

import LowChevron from "@/assets/LowChevron.svg";
import Plus from "@/assets/plus.svg";

import { getProjectTheme } from "@/utils/theme";
import { createProject } from "@/apis/project/projectAPI";

import type { Project } from "@/apis/memoir/memoirTypes";
const normalize = (s: string) => s.trim().toLowerCase();

const ProjectContainer = ({
  projectsAll,
  refetchProjects,
  projectId,
  setProjectId,
  chosenProjectBgColor,
  chosenProjectTextColor,
  setChosenProjectBgColor,
  setChosenProjectTextColor,
  chosenProject,
  setChosenProject,
}) => {
  const list = projectsAll ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState("");
  const [creating, setCreating] = useState(false);

  const updateProjectsAll = async () => {
    const name = newProject.trim();
    if (!name) return;

    // 이름 중복(공백/대소문자 무시)
    const exists = list.some((p) => normalize(p.projectName ?? p.name ?? "") === normalize(name));
    if (exists) {
      alert("같은 이름의 프로젝트가 이미 존재합니다.");
      return;
    }

    try {
      setCreating(true);
      // 최신 입력값을 직접 전송
      const data = {
        name: newProject,
      };
      const res = await createProject(data);
      if (!res) {
        throw new Error("프로젝트 생성 실패");
      }

      const createdId: string = res.projectId;
      const createdName: string = res.name;

      // 부모 목록 즉시 리패치 → 새로고침 없이 UI 반영
      if (typeof refetchProjects === "function") {
        await refetchProjects();
      }

      // 방금 만든 프로젝트 선택
      if (createdId) {
        setProjectId(createdId);
        setChosenProject(createdName);
      }

      setNewProject("");
    } catch {
      alert("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setCreating(false);
    }
  };

  const toggleBannerBox = () => setIsOpen((v) => !v);

  // projectId가 바뀌면 테마/이름 갱신
  useEffect(() => {
    // projectId 없음 → 아무 작업도 안 함
    if (!projectId) return;

    // list가 비어있음 / 로딩 중 → 아직 업데이트하지 말기
    if (!list || list.length === 0) return;

    const p: Project = list.find((x) => x.projectId === projectId);
    if (!p) return; // 새 프로젝트가 아직 list에 반영되지 않은 순간도 무시

    const t = getProjectTheme(p.projectId);

    setChosenProject(p.projectName);
    setChosenProjectBgColor(t.bg);
    setChosenProjectTextColor(t.text);
  }, [projectId, list]);
  return (
    <div className={`${styles.ctn_in_common} ${styles.to_write_meeting}`}>
      <p className={styles.write_title}>프로젝트</p>

      <div className={styles.project_banner_ctn}>
        <div className={`${styles["in-common"]} ${styles.banner}`} onClick={toggleBannerBox}>
          <div className={styles.banner_name_ctn} style={{ background: chosenProjectBgColor }}>
            <p className={styles.banner_name} style={{ color: chosenProjectTextColor }}>
              {chosenProject || "선택된 프로젝트 없음"}
            </p>
          </div>
          <img
            src={LowChevron}
            alt="LowChevron"
            className={`${styles.chevron_icon} ${isOpen ? styles.rotate : ""}`}
          />
        </div>

        <div
          className={`${styles["in-common"]} ${styles.banner_box} ${isOpen ? styles.open : styles.closed}`}
        >
          <div className={styles.banner_box_input_ctn}>
            <input
              type="text"
              className={styles.project_banner_input}
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="새 프로젝트 이름"
              disabled={creating}
            />
            <img
              src={Plus}
              alt="plus"
              onClick={creating ? undefined : updateProjectsAll}
              style={{
                cursor: creating ? "not-allowed" : "pointer",
                opacity: creating ? 0.6 : 1,
              }}
            />
          </div>

          {list.map((project) => {
            const t = getProjectTheme(project.projectId);
            return (
              <div key={project.projectId} className={styles.checkbox_ctn}>
                <input
                  className={styles.study_checkbox}
                  type="radio"
                  name="project"
                  checked={projectId === project.projectId}
                  onChange={() => setProjectId(project.projectId)}
                />
                <div className={styles.banner_name_ctn} style={{ backgroundColor: t.bg }}>
                  <p className={styles.banner_name} style={{ color: t.text }}>
                    {project.projectName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectContainer;
