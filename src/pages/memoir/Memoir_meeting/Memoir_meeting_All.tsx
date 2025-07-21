import React from "react";
import Memoir_meeting_ctn from "./Memoir_meeting_ctn";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import { useAPIs } from "@/apis/useAPIs";

const Memoir_meeting_All = () => {
  const { response: meetingLists, loading, error } = useAPIs(`/meetinglist`);
  console.log(meetingLists);
  if (loading) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>⌛ 로딩 중…</p>
        <Memoir_bottom_fixed />
      </>
    );
  }

  /* ===== 2) 에러 화면 ===== */
  if (error) {
    return (
      <>
        <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
          ❌ 에러 발생: {error}
        </p>
        <Memoir_bottom_fixed />
      </>
    );
  }

  /* ===== 3) 정상 화면 ===== */
  return (
    <>
      <Memoir_meeting_ctn
        /* meetingLists가 배열인지 한 번 더 방어 */
        meetingLists={Array.isArray(meetingLists) ? meetingLists : []}
      />
      <Memoir_bottom_fixed />
    </>
  );
};

export default Memoir_meeting_All;
