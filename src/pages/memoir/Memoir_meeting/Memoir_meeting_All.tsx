import React, { useEffect, useMemo, useRef, useState } from "react";
import Memoir_meeting_ctn from "./Memoir_meeting_ctn";


import { useLocation, useNavigate } from "react-router-dom";

import { getProjectTheme } from "@/utils/theme";
import { apiCall } from "@/apis/apiCall";

const Memoir_meeting_All = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const didInit = useRef(false);
  const didRefetch = useRef(false);
  const mounted =useRef(true);

  const [meetingLists, setMeetingLists] = useState<any>(null);
  const [memoirLists, setMemoirLists] = useState<any>(null);
  const [meetingSummary, setMeetingSummary] = useState<any>(null);

  // const {
  //   response: meetingLists,
  //   loading: meetingLoading,
  //   error: meetingError,
  //   fire: execMeetingAll,
  // } = useAPIs2(`/meeting-lists/need-reflection`, "GET", undefined, true, false);

  useEffect(()=>{
    return ()=>{
      mounted.current=false;
    };
  },[]);//unmount될 때 false로 바뀐다.

  const getMeetingLists = async () => {
    const res = await apiCall(
      `/meeting-lists/need-reflection`,
      "GET",
      null,
      true
    );
    if(!mounted.current) return;
    if (!res) return;
    if (res.code === 401) {
      alert("인증이 필요합니다");
    } else if (res.code === 200) {
      setMeetingLists(res.data);
    } else {
      alert("서버 오류");
    }
  };

  // const {
  //   response: memoirLists,
  //   loading: memoirLoading,
  //   error: memoirError,
  //   fire: execMemoirAll,
  // } = useAPIs2(`/meeting/reflections`, "GET", undefined, true, false);

  const getMemoirLists = async () => {
    const res = await apiCall(`/meeting/reflections`, "GET", null, true);
    if(!mounted.current) return;
    if (res.code === 401) {
      alert("인증 토큰이 필요합니다!");
    } else if (res.code === 200) {
      setMemoirLists(res.data);
    } else {
      alert("서버 오류");
    }
  };

  // const {
  //   response: meetingSummary,
  //   loading: summaryLoading,
  //   error: summaryError,
  //   fire: execSummaryAll,
  // } = useAPIs2(`/reflection/summary`, "GET", undefined, true, false);

  const getMeetingSummary = async () => {
    const res = await apiCall(`/reflection/summary`, "GET", null, true);
    if(!mounted.current) return;
    if (res.code === 401) {
      alert("인증 토큰이 필요합니다!");
    } else if (res.code === 200) {
      setMeetingSummary(res.data);
    } else {
      alert("서버 오류");
    }
  };

  //여기서 didInit변수는 컴포넌트가 처음 마운트될 때 딱 1번만 초기데이터를
  //불러오게 하는 가드 플래그...
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    getMeetingLists();
    getMemoirLists();
    getMeetingSummary();
  }, []);

  useEffect(() => {
    const s: any = location.state;
    if (!s?.refetchMemoirs || didRefetch.current) return;

    didRefetch.current = true;
    getMeetingLists();
    getMemoirLists();
    getMeetingSummary();
    navigate(location.pathname, { replace: true, state: undefined });
  }, []
  );

  //여기서 meetingLists중 meeting_status가 "종료인것만 남긴다."

  const memoir = Array.isArray(memoirLists) ? memoirLists : [];

  const memoirWithTheme = useMemo(
    () =>
      memoir.map((m: any) => ({
        ...m,
        // memoir 항목에 projectId가 없을 수도 있으니 fallback 더 넓게
        theme: getProjectTheme(
          m?.projectId ??
            m?.projectName ??
            m?.meetingId ??
            m?.title ??
            m?.confirmedTime ??
            m?.completedWork ??
            m?.plannedWork ??
            "default"
        ),
      })),
    [memoir]
  );

  if (!meetingLists || !memoirLists || !meetingSummary) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>⌛ 로딩 중…</p>
      </>
    );
  }

  // /* ===== 2) 에러 화면 ===== */
  // if (meetingError || memoirError || summaryError) {
  //   return (
  //     <>
  //       <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
  //         ❌ 에러 발생: {meetingError || memoirError}
  //       </p>
  //     </>
  //   );
  // }

  return (
    <div style={{ flex: 1, width: "100%" }}>
      <Memoir_meeting_ctn
        /* meetingLists가 배열인지 한 번 더 방어 */
        meetingLists={Array.isArray(meetingLists) ? meetingLists : []}
        memoirLists={memoirWithTheme}
        meetingSummary={meetingSummary}
      />
    </div>
  );
};

export default Memoir_meeting_All;
