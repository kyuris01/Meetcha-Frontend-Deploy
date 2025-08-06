import React, { useState, useEffect } from "react";

import "./Memoir_write.scss";

import LowChevron from "@/assets/LowChevron.svg";

import Plus from "@/assets/plus.svg";

const Project_container = ({ projectsAll, projectId, setProjectId }) => {
  const [chosenProject, setChosenProject] = useState<string>("");
  const [chosenProjectTextColor, setChosenProjectTextColor] =
    useState<string>("");
  const [chosenProjectBgColor, setChosenProjectBgColor] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<string>("");

  const [projectList, setProjectList] = useState(projectsAll || []);
  useEffect(() => {
    setProjectList(projectsAll || []);
  }, [projectsAll]);
  //여기서 새로 생성된 프로젝트는 id또한 가져야함
  //id는 랜덤의 값으로 하나 부여 data()함수 사용
  const updateProjectsAll = () => {
    const trimmedName = newProject.trim();
    if (!trimmedName) return;

    if (projectList.some((p) => p.projectName === trimmedName)) {
      alert("같은 이름의 프로젝트가 이미 존재합니다.");
      return;
    }

    const newId = `local-${Date.now()}`;

    const newItem = {
      projectId: newId,
      projectName: newProject,
    };

    setProjectList([...projectList, newItem]);
    setNewProject("");
  };

  const toggleBannerBox = () => setIsOpen(!isOpen);

  const textColors = [
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
    "#891E01",
  ];

  const bgColors = [
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
  //projectList에 내가 설정한(추가한)프로젝트 전부가 들어있음
  const handleProjectClick = (project) => {
    //여기서 projectId 설정해야한다.

    setProjectId(project.projectId);
  };

  const handleChosenProject = (project, bgColor, textColor) => {
    setChosenProject(project.projectName);
    handleProjectClick(project);
    setChosenProjectBgColor(bgColor);
    setChosenProjectTextColor(textColor);
  };
  useEffect(() => {
    console.log("선택된 projectId:", projectId);
  }, [projectId]);
  return (
    <div className="ctn_in_common to_write_meeting">
      <p className="write_title">프로젝트</p>
      <div className="project_banner_ctn">
        <div className="in-common banner" onClick={toggleBannerBox}>
          <div
            style={{
              background: chosenProjectBgColor,
            }}
            className="banner_name_ctn"
          >
            <p
              className="banner_name"
              style={{
                color: chosenProjectTextColor,
              }}
            >
              {chosenProject || "선택된 프로젝트 없음"}
            </p>
          </div>
          <img
            src={LowChevron}
            alt="LowChevron"
            className={`chevron_icon ${isOpen ? "rotate" : ""}`}
          ></img>
        </div>
        <div className={`in-common banner_box ${isOpen ? "open" : "closed"}`}>
          <div className="banner_box_input_ctn">
            <input
              type="text"
              className="project_banner_input"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            ></input>
            <img src={Plus} alt="plus" onClick={updateProjectsAll}></img>
          </div>
          {projectList.map((project, index) => {
            const bgColor = bgColors[index % bgColors.length];
            const textColor = textColors[index % textColors.length];

            return (
              <div key={project.projectId} className="checkbox_ctn">
                <input
                  className="study_checkbox"
                  type="radio"
                  name="project"
                  checked={chosenProject === project.projectName}
                  onChange={() =>
                    handleChosenProject(project, bgColor, textColor)
                  }
                ></input>
                <div
                  className="banner_name_ctn"
                  style={{ backgroundColor: bgColor }}
                >
                  <p className="banner_name" style={{ color: textColor }}>
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
