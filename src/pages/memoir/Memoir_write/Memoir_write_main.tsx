import React, { useState, useEffect } from "react";

import Meeting_card from "../Memoir_common/Meeting_card";
import Project_container from "./Project_container";
import "./Memoir_write.scss";
import { useNavigate } from "react-router-dom";
const Memoir_write_main = ({
  projectsAll,
  refetchProjects,
  contribution,
  setContribution,
  role,
  setRole,
  feeling,
  setFeeling,
  done,
  setDone,
  todo,
  setTodo,
  projectId,
  setProjectId,
  chosenProjectBgColor,
  chosenProjectTextColor,
  setChosenProjectBgColor,
  setChosenProjectTextColor,
  meeting, //meetingid받기위해서...
}) => {
  const navigate = useNavigate();

  const [chosenProject, setChosenProject] = useState<string>("");
  
  useEffect(() => {
  if (meeting?.projectId) {
    setProjectId(meeting.projectId);   // 페이지 진입/meeting 로드 시 1회 반영
  }
}, [meeting?.projectId]);

  useEffect(() => {
    setChosenProject(meeting?.projectName ?? "");
  }, [meeting?.projectName]);

  return (
    <div className="main_ctn">
      <div className="meeting_card_ctn">
        <p className="write_title">작성할 회의</p>
        <Meeting_card
          chosenProject={chosenProject}
          setChosenProject={setChosenProject}
          chosenProjectBgColor={chosenProjectBgColor}
          chosenProjectTextColor={chosenProjectTextColor}
          meeting={meeting}
        />
      </div>
      <div className="contribution_role">
        <div className="ctn_in_common contribution">
          <p className="write_title">
            기여도<span className="star">*</span>
          </p>
          <input
            type="text"
            className="in-common contribution_input"
            value={contribution}
            placeholder="0"
            onChange={(e) => setContribution(e.target.value)}
          />
        </div>
        <div className="ctn_in_common role">
          <p className="write_title">
            맡은 역할<span className="star">*</span>
          </p>
          <input
            type="text"
            className="in-common"
            value={role}
            placeholder="맡은 역할: 백수"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>
      <div className="ctn_in_common what_you_feel">
        <p className="write_title">
          느낀 점<span className="star">*</span>
        </p>
        <textarea
          className="in-common feel_ctn"
          value={feeling}
          placeholder="미팅에서 만족한 부분, 문제점 그리고 시도해볼 것이 있나욥?"
          onChange={(e) => setFeeling(e.target.value)}
        ></textarea>
      </div>
      <div className="ctn_in_common to_write_meeting">
        <p className="write_title">한 일</p>
        <input
          type="text"
          className="in-common"
          value={done}
          placeholder="이번 시간에 한 일을 작성해 주세욧"
          onChange={(e) => setDone(e.target.value)}
        />
      </div>
      <div className="ctn_in_common to_write_meeting">
        <p className="write_title">할 일</p>
        <input
          type="text"
          className="in-common"
          value={todo}
          placeholder="다음 시간까지 할 일을 작성해주세욯"
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <Project_container
        projectsAll={projectsAll}
        refetchProjects={refetchProjects}
        projectId={projectId}
        setProjectId={setProjectId}
        chosenProjectBgColor={chosenProjectBgColor}
        chosenProjectTextColor={chosenProjectTextColor}
        setChosenProjectTextColor={setChosenProjectTextColor}
        setChosenProjectBgColor={setChosenProjectBgColor}
        meeting={meeting}
        chosenProject={chosenProject}
        setChosenProject={setChosenProject}
      />
    </div>
  );
};

export default Memoir_write_main;
