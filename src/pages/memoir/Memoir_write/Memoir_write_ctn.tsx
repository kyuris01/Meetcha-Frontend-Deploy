import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Memoir_write_intro from "./Memoir_write_intro";
import Memoir_write_main from "./Memoir_write_main";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import { useAPIs2 } from "@/apis/useAPIs2";
import { useAPIs } from "@/apis/useAPIs";

import "./Memoir_write.scss";

const Memoir_write_ctn = () => {
  const [contribution, setContribution] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const location = useLocation();
  const { meeting } = location.state || {};
  const isReadyToSubmit = !!(
    contribution &&
    role &&
    feeling &&
    Number(contribution) > 0 &&
    Number(contribution) <= 100 &&
    role.length <= 10
  );

  const {
    response: projectsAll,
    loading,
    error,
    fire,
  } = useAPIs2("/user/projects", "GET", undefined, true, false);


  console.log(projectsAll);

  const navigate = useNavigate();
 
  const data = {
    contribution: Number(contribution),
    role: role.trim(),
    thought: feeling.trim(),
    ...(done && { completedWork: done }),
    ...(todo && { plannedWork: todo }),
    ...(projectId && { projectId: projectId }),
  };
  console.log(meeting.meetingId);
  const {
    response: postResponse,
    loading: postLoading,
    error: postError,
    fire: postReflection,
  } = useAPIs2(
    `/meeting/${meeting?.meetingId}/reflection/create`,
    "POST",
    data,
    true,
    true
  );
  console.log(postResponse);
  const handleSubmitBtnClick = () => {
    if (!meeting?.meetingId) {
      alert("미팅 정보가 없습니다.");
      return;
    }

    postReflection();
    console.log(meeting);
    console.log(role.length, role);
    console.log(data);
    console.log(meeting?.meetingId);
  };

  useEffect(() => {
    if (postResponse?.isSuccess) {
      navigate("/memoir");
    }
  }, [postResponse]);

  if (loading) return <p>⌛ 프로젝트 목록 불러오는 중...</p>;
  if (error) return <p>❌ 프로젝트 목록 불러오기 실패: {error}</p>;
  return (
    <div className="Memoir_write_ctn">
      <div className="Memoir_content_ctn">
        <Memoir_write_intro />
        <Memoir_write_main
          projectsAll={projectsAll.data}
          contribution={contribution}
          setContribution={setContribution}
          role={role}
          setRole={setRole}
          feeling={feeling}
          setFeeling={setFeeling}
          done={done}
          setDone={setDone}
          todo={todo}
          setTodo={setTodo}
          projectId={projectId}
          setProjectId={setProjectId}
          meeting={meeting}
        />
      </div>

      <div className="memoir_botton_fixed">
        <button
          onClick={handleSubmitBtnClick}
          className={
            isReadyToSubmit ? "memoir_write_btn_ready" : "memoir_write_btn"
          }
          disabled={!isReadyToSubmit}
        >
          <p>회고 작성하기</p>
        </button>
      </div>
    </div>
  );
};

export default Memoir_write_ctn;
