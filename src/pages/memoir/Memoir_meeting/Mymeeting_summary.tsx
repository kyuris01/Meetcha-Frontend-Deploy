import React, { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

import LowChevron from "@assets/LowChevron.svg";
import meetchalogo from "@assets/MeetchaLogo.svg";

import Summary_card from "./Summary_card";

import "./Memoir_meeting.scss";

const Mymeeting_summary = ({ meetingSummary, meetingLists, memoirLists }) => {
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("--");
  const [averageContribution, setAverageContribution] = useState<number>(0);

  console.log(meetingSummary);

  useEffect(() => {
    if (!meetingSummary?.data) return; // 요약 데이터 도착 시에만 세팅
    setMeetingCount(meetingSummary.data.totalReflections ?? 0);
    setMainRole(meetingSummary.data.mostFrequentRole ?? "--");
    setAverageContribution(meetingSummary.data.averageContribution ?? 0);
  }, [meetingSummary]);

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
