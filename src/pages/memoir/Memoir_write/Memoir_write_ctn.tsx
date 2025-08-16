import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Memoir_write_intro from "./Memoir_write_intro";
import Memoir_write_main from "./Memoir_write_main";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import { useAPIs2 } from "@/apis/useAPIs2";
import { useAPIs } from "@/apis/useAPIs";

import "./Memoir_write.scss";

type Project = { projectId: string; projectName: string };

const Memoir_write_ctn = () => {
  const [contribution, setContribution] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const [chosenProjectTextColor, setChosenProjectTextColor] =
    useState<string>("");
  const [chosenProjectBgColor, setChosenProjectBgColor] = useState<string>("");

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

  // 원래 훅 그대로 유지
  const {
    response: projectsAllRes,
    loading,
    error,
    fire: refetchProjectsApi,
  } = useAPIs2("/user/projects", "GET", undefined, true, false);

  // 실제로 자식에게 내려줄 배열 상태 (참조 변경 보장)
  const [projectsAllState, setProjectsAllState] = useState<Project[]>([]);

  // 최초/변경 시 응답 반영
  useEffect(() => {
    if (Array.isArray(projectsAllRes?.data)) {
      // 새 배열로 교체 → 자식 컴포넌트만 리렌더
      setProjectsAllState(projectsAllRes.data.slice());
    }
  }, [projectsAllRes]);

  // 자식이 호출하는 진짜 refetch: 새 배열로 set해서 리렌더 보장
  const refetchProjects = useCallback(async () => {
    const res: any = await refetchProjectsApi();
    if (res?.code === 200 && Array.isArray(res.data)) {
      setProjectsAllState(res.data.slice());
    }
    return res;
  }, [refetchProjectsApi]);

  const navigate = useNavigate();

  const data = {
    contribution: Number(contribution),
    role: role.trim(),
    thought: feeling.trim(),
    ...(done && { completedWork: done }),
    ...(todo && { plannedWork: todo }),
    ...(projectId && { projectId: projectId }),
  };

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

  const handleSubmitBtnClick = () => {
    if (!meeting?.meetingId) {
      alert("미팅 정보가 없습니다.");
      return;
    }
    postReflection();
  };

  //memoir 이동 + 1회 자동 새로고침(네가 원하던 동작 유지)
  useEffect(() => {
    if (postResponse?.isSuccess) {
      navigate("/memoir", { replace: true });
      setTimeout(() => window.location.reload(), 0);
    }
  }, [postResponse, navigate, meeting?.meetingId]);

  if (loading) return <p>⌛ 프로젝트 목록 불러오는 중...</p>;
  if (error) return <p> 프로젝트 목록 불러오기 실패: {error}</p>;

  return (
    <div className="Memoir_write_ctn">
      <div className="Memoir_content_ctn">
        <Memoir_write_intro />
        <Memoir_write_main
          projectsAll={projectsAllState}     // state 배열 전달
          refetchProjects={refetchProjects} // 자식에서 호출
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
          chosenProjectTextColor={chosenProjectTextColor}
          setChosenProjectTextColor={setChosenProjectTextColor}
          chosenProjectBgColor={chosenProjectBgColor}
          setChosenProjectBgColor={setChosenProjectBgColor}
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
