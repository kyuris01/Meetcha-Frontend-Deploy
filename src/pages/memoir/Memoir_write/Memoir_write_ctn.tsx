import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Memoir_write_intro from "./Memoir_write_intro";
import Memoir_write_main from "./Memoir_write_main";
import { apiCall } from "@/apis/apiCall";

import "./Memoir_write.scss";

interface Project {
  projectId: string;
  projectName: string;
}

const Memoir_write_ctn = () => {
  // 폼 상태
  const [contribution, setContribution] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const [chosenProjectTextColor, setChosenProjectTextColor] = useState<string>("");
  const [chosenProjectBgColor, setChosenProjectBgColor] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const { meeting } = location.state || {};

  // 마운트 가드 (언마운트 중 setState 방지)
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  // 제출 가능 여부
  const numContribution = Number(contribution);
  const isReadyToSubmit = Boolean(
    contribution &&
      role &&
      feeling &&
      numContribution > 0 &&
      numContribution <= 100 &&
      role.length <= 10
  );

  // 프로젝트 목록
  const [projectsAll, setProjectsAll] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const fetchProjectsAll = useCallback(async () => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const res = await apiCall("/user/projects", "GET", undefined, true);
      if (res?.code === 200 && Array.isArray(res.data)) {
        if (mounted.current) setProjectsAll(res.data.slice()); // 참조 변경 보장
      } else if (res?.code === 401) {
        alert("인증이 필요합니다");
      } else {
        alert(res?.message ?? "서버 오류");
      }
    } catch (e) {
      if (mounted.current) setProjectsError("프로젝트 목록을 불러오지 못했습니다.");
    } finally {
      if (mounted.current) setProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectsAll();
  }, [fetchProjectsAll]);

  // 자식에서 새 프로젝트 생성 후 호출할 리패치 함수
  const refetchProjects = useCallback(async () => {
    await fetchProjectsAll();
  }, [fetchProjectsAll]);

  // 제출
  const [submitLoading, setSubmitLoading] = useState(false);

  const data = {
    contribution: numContribution,
    role: role.trim(),
    thought: feeling.trim(),
    ...(done && { completedWork: done }),
    ...(todo && { plannedWork: todo }),
    ...(projectId && { projectId }),
  };

  const handleSubmitBtnClick = async () => {
    if (!isReadyToSubmit) return;
    if (!meeting?.meetingId) {
      alert("미팅 정보가 없습니다.");
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await apiCall(
        `/meeting/${meeting.meetingId}/reflection/create`,
        "POST",
        data,
        true
      );
      const ok = res?.success || res?.code === 200 || res?.code === 201;

      if (ok) {
        navigate("/memoir", { replace: true, state: { refetchMemoirs: true } });
      } else if (res?.code === 401) {
        alert("인증이 필요합니다");
      } else {
        alert(res?.message ?? "회고 작성에 실패했습니다.");
      }
    } catch (e) {
      alert("서버 오류");
    } finally {
      if (mounted.current) setSubmitLoading(false);
    }
  };

  if (projectsLoading) return <p>⌛ 프로젝트 목록 불러오는 중...</p>;
  if (projectsError) return <p>프로젝트 목록 불러오기 실패: {projectsError}</p>;

  return (
    <div className="Memoir_write_ctn">
      <div className="Memoir_content_ctn">
        <Memoir_write_intro />
        <Memoir_write_main
          projectsAll={projectsAll} // ✅ state 배열 전달
          refetchProjects={refetchProjects} // ✅ 자식에서 호출하면 목록 최신화
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
          // (선택) 버튼 로딩 표시용으로 props 넘겨 사용해도 됨
        />
      </div>

      <div className="memoir_botton_fixed">
        <button
          onClick={handleSubmitBtnClick}
          className={isReadyToSubmit ? "memoir_write_btn_ready" : "memoir_write_btn"}
          disabled={!isReadyToSubmit || submitLoading}
        >
          <p>{submitLoading ? "작성 중..." : "회고 작성하기"}</p>
        </button>
      </div>
    </div>
  );
};

export default Memoir_write_ctn;
