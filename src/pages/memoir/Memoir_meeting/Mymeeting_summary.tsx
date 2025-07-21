import React, { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

import LowChevron from "@assets/LowChevron.svg";
import meetchalogo from "@assets/MeetchaLogo.svg";

import Summary_card from "./Summary_card";

import "./Memoir_meeting.scss";

interface Meeting {
  role: string;
  contribution: string;
}

const Mymeeting_summary = ({
  meetingLists = [],
}: {
  meetingLists: Meeting[];
}) => {
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("");
  const [averageContribution, setAverageContribution] = useState<string>("");

  useEffect(() => {
    if (!Array.isArray(meetingLists) || meetingLists.length === 0) return;

    /* 1) 미팅 건수 */
    setMeetingCount(meetingLists.length);

    /* 2) 주요 역할 */
    const roleCount: Record<string, number> = {};
    meetingLists.forEach(({ role }) => {
      roleCount[role] = (roleCount[role] || 0) + 1;
    });
    const topRole = Object.keys(roleCount).reduce((a, b) =>
      roleCount[a] > roleCount[b] ? a : b
    );
    setMainRole(topRole);

    /* 3) 평균 기여도 */
    const total = meetingLists.reduce(
      (acc, cur) => acc + parseInt(cur.contribution.replace("%", ""), 10),
      0
    );
    const avg = Math.round(total / meetingLists.length);
    setAverageContribution(`${avg}%`);
  }, [meetingLists]); // meetingLists가 바뀔 때만 실행

  return (
    <div className="meeting_summary_ctn">
      <div className="logo_container">
        <button>
          <img className="logo_button" src={meetchalogo} alt="leftChevron" />
        </button>
      </div>
      <div className="myMeeting_intro">
        <p>나의 미팅 요약</p>
        <button className="button_container">
          <p>전체</p>
          <img src={LowChevron} alt="lowchevron" />
        </button>
      </div>
      <div className="myMeetings">
        <Summary_card title="미팅 건수" value={`${meetingCount}`} />
        <Summary_card title="주요 역할" value={mainRole} />
        <Summary_card title="평균 기여도" value={`${averageContribution}`} />
      </div>
    </div>
  );
};

export default Mymeeting_summary;
