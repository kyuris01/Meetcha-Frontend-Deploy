// Project_container.tsx
import React, { useEffect, useState } from "react";
import "./Memoir_write.scss";

import { useLocation } from "react-router-dom";
import LowChevron from "@/assets/LowChevron.svg";
import Plus from "@/assets/plus.svg";

import { getProjectTheme } from "@/utils/theme";
import { apiCall } from "@/utils/apiCall";

type Project = {
  projectId: string;
  projectName: string;
  id?: string;   // 서버가 이렇게 내려올 수도 있어 대비
  name?: string; // 서버가 이렇게 내려올 수도 있어 대비
};

type Props = {
  projectsAll: Project[] | undefined;
  refetchProjects?: () => Promise<any>;

  projectId: string | null;
  setProjectId: (id: string) => void;

  chosenProjectBgColor?: string;
  chosenProjectTextColor?: string;
  setChosenProjectBgColor: (c: string | undefined) => void;
  setChosenProjectTextColor: (c: string | undefined) => void;

  meeting?: any;
  chosenProject: string;
  setChosenProject: (name: string) => void;
};

const normalize = (s: string) => s.trim().toLowerCase();

const Project_container: React.FC<Props> = ({
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

  const location=useLocation();
  const updateProjectsAll = async () => {
    const name = newProject.trim();
    if (!name) return;

    // 이름 중복(공백/대소문자 무시)
    const exists = list.some(
      (p) => normalize(p.projectName ?? p.name ?? "") === normalize(name)
    );
    if (exists) {
      alert("같은 이름의 프로젝트가 이미 존재합니다.");
      return;
    }

    try {
      setCreating(true);
      // 최신 입력값을 직접 전송
      const res: any = await apiCall("/user/projects", "POST", { name }, true);
      if (!res || (res.code !== 200 && res.code !== 201)) {
        throw new Error(res?.message || "프로젝트 생성 실패");
      }

      const createdId: string | undefined = res.data?.projectId ?? res.data?.id;
      const createdName: string = res.data?.projectName ?? res.data?.name ?? name;


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
    } catch (e: any) {
      alert(e?.message || "프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setCreating(false);
    }
  };

  const toggleBannerBox = () => setIsOpen((v) => !v);

  // projectId가 바뀌면 테마/이름 갱신
  useEffect(() => {
    if (!projectId) {
      setChosenProject("");
      setChosenProjectBgColor(undefined);
      setChosenProjectTextColor(undefined);
      return;
    }
    const p = list.find((x) => x.projectId === projectId);
    if (p) {
      const t = getProjectTheme(p.projectId);
      setChosenProject(p.projectName ?? p.name ?? "");
      setChosenProjectBgColor(t.bg);
      setChosenProjectTextColor(t.text);
    }
  }, [
    projectId,
    list,
    setChosenProject,
    setChosenProjectBgColor,
    setChosenProjectTextColor,
  ]);

  return (
    <div className="ctn_in_common to_write_meeting">
      <p className="write_title">프로젝트</p>

      <div className="project_banner_ctn">
        <div className="in-common banner" onClick={toggleBannerBox}>
          <div className="banner_name_ctn" style={{ background: chosenProjectBgColor }}>
            <p className="banner_name" style={{ color: chosenProjectTextColor }}>
              {chosenProject || "선택된 프로젝트 없음"}
            </p>
          </div>
          <img
            src={LowChevron}
            alt="LowChevron"
            className={`chevron_icon ${isOpen ? "rotate" : ""}`}
          />
        </div>

        <div className={`in-common banner_box ${isOpen ? "open" : "closed"}`}>
          <div className="banner_box_input_ctn">
            <input
              type="text"
              className="project_banner_input"
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
              <div key={project.projectId} className="checkbox_ctn">
                <input
                  className="study_checkbox"
                  type="radio"
                  name="project"
                  checked={projectId === project.projectId}
                  onChange={() => setProjectId(project.projectId)}
                />
                <div className="banner_name_ctn" style={{ backgroundColor: t.bg }}>
                  <p className="banner_name" style={{ color: t.text }}>
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

export default Project_container;

