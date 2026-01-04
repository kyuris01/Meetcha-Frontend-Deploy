import React, { useEffect, useState } from "react";

import SummaryCard from "./SummaryCard";
import type { meetingSummary } from "@/apis/memoir/memoirTypes";
import "./MemoirMeeting.scss";

interface props {
  meetingSummary: meetingSummary;
}
const MymeetingSummary = ({ meetingSummary }: props) => {
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("--");
  const [averageContribution, setAverageContribution] = useState<number>(0);

  useEffect(() => {
    if (!meetingSummary) return; // 요약 데이터 도착 시에만 세팅
    setMeetingCount(meetingSummary.totalReflections ?? 0);
    setMainRole(meetingSummary.mostFrequentRole ?? "--");
    setAverageContribution(meetingSummary.averageContribution ?? 0);
  }, [meetingSummary]);

  return (
    <div className="meeting_summary_ctn">
      <div className="myMeeting_intro">
        <p>나의 미팅 요약</p>
      </div>
      <div className="myMeetings">
        <SummaryCard title="미팅 건수" value={`${meetingCount}`} />
        <SummaryCard title="주요 역할" value={mainRole} />
        <SummaryCard title="평균 기여도" value={`${averageContribution}%`} />
      </div>
    </div>
  );
};

export default MymeetingSummary;
