import React, { useEffect } from "react";
import Memoir_meeting_ctn from "./Memoir_meeting_ctn";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import { useAPIs2 } from "@/apis/useAPIs2";

const Memoir_meeting_All = () => {
  const userId = 3;
  const {
    response: meetingLists,
    loading:meetingLoading,
    error:meetingError,
    fire: execMeetingAll,
  } = useAPIs2(`/meeting-lists/need-reflection`, "GET", undefined, true, false);

  const {
    response: memoirLists,
    loading:memoirLoading,
    error:memoirError,
    fire: execMemoirAll,
  } = useAPIs2(`/meeting/reflections`, "GET", undefined, true, false);
  
  useEffect(() => {
    execMeetingAll();
    execMemoirAll();
  }, []);

  //여기서 meetingLists중 meeting_status가 "종료인것만 남긴다."

  if ((meetingLoading || memoirLoading)) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>⌛ 로딩 중…</p>
      </>
    );
  }

  /* ===== 2) 에러 화면 ===== */
  if (meetingError || memoirError) {
    return (
      <>
        <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
          ❌ 에러 발생: {meetingError || memoirError}
        </p>
      </>
    );
  }
  console.log(meetingLists);
  console.log(memoirLists);
  return (
    <>
      <Memoir_meeting_ctn
        /* meetingLists가 배열인지 한 번 더 방어 */
        meetingLists={Array.isArray(meetingLists.data) ? meetingLists.data : []}
        memoirLists={Array.isArray(memoirLists?.data) ? memoirLists.data : []}
      />
    </>
  );
};

export default Memoir_meeting_All;
