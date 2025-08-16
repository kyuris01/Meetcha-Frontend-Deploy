import React, { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

import LowChevron from "@assets/LowChevron.svg";
import meetchalogo from "@assets/MeetchaLogo.svg";

import Summary_card from "./Summary_card";

import "./Memoir_meeting.scss";

const Mymeeting_summary = ({ meetingSummary,meetingLists, memoirLists }) => {
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("");
  const [averageContribution, setAverageContribution] = useState<number>();

  console.log(meetingSummary);
  useEffect(() => {
    if (!Array.isArray(meetingLists) || meetingLists.length === 0) return;

    /* 1) 미팅 건수 */
    setMeetingCount(meetingSummary.data.totalReflections);

    /* 2) 주요 역할 */

    setMainRole(meetingSummary.data.mostFrequentRole??"--");

    /* 3) 평균 기여도 */

    setAverageContribution(meetingSummary.data.averageContribution??0);
  }, [memoirLists]); // meetingLists가 바뀔 때만 실행

  return (
    <div className="meeting_summary_ctn">
      <div className="myMeeting_intro">
        <p>나의 미팅 요약</p>
      </div>
      <div className="myMeetings">
        <Summary_card title="미팅 건수" value={`${meetingCount}`} />
        <Summary_card title="주요 역할" value={mainRole} />
        <Summary_card title="평균 기여도" value={`${averageContribution}%`} />
      </div>
    </div>
  );
};

export default Mymeeting_summary;
