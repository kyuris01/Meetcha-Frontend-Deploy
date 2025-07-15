import React, { useEffect, useState } from "react";
import styles from "./MeetingCreationView.module.scss";
import Pencil from "@assets/pencil.svg?react";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import Watch from "@assets/watch.svg?react";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingData } from "./MeetingCreationPage";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingData>>;
}

const MeetingCreationView = ({ setAllDataReserved, setCompleteData }: Props) => {
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingExplanation, setMeetingExplanation] = useState<string>();
  const [meetingCandidateDate, setMeetingCandidateDate] = useState<string[]>();
  const [meetingProceedTime, setMeetingProceedTime] = useState<string>();
  const [voteExpirationTime, setVoteExpirationTime] = useState<string>();

  const cardDataSet = [
    {
      id: 0,
      title: "미팅 설명",
      icon: <Pencil />,
      data: meetingExplanation,
      dataSetter: setMeetingExplanation,
    },
    {
      id: 1,
      title: "미팅 후보 날짜",
      icon: <Calendar />,
      data: meetingCandidateDate,
      dataSetter: setMeetingCandidateDate,
    },
    {
      id: 2,
      title: "미팅 진행 시간",
      icon: <Clock />,
      data: meetingProceedTime,
      dataSetter: setMeetingProceedTime,
    },
    {
      id: 3,
      title: "투표 마감 시간",
      icon: <Watch />,
      data: voteExpirationTime,
      dataSetter: setVoteExpirationTime,
    },
  ];

  useEffect(() => {
    if (
      meetingTitle &&
      meetingExplanation &&
      meetingCandidateDate &&
      meetingProceedTime &&
      voteExpirationTime
    ) {
      setAllDataReserved(true);
      setCompleteData({
        title: meetingTitle,
        explanation: meetingExplanation,
        candidateDate: meetingCandidateDate,
        proceedTime: meetingProceedTime,
        expirationTime: voteExpirationTime,
      });
    }
  }, [
    meetingTitle,
    meetingExplanation,
    meetingCandidateDate,
    meetingProceedTime,
    voteExpirationTime,
  ]);

  return (
    <div className={styles.meetingCreationView}>
      <input
        className={styles.meetingCreationView__inputTag}
        type="text"
        placeholder="미팅 제목을 적어주세요"
        onChange={(e) => {
          setMeetingTitle(e.target.value);
        }}
      />
      <div className={styles.meetingCreationView__meetingOptionContainer}>
        {cardDataSet.map((item, index) => (
          <MeetingOptionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            data={item.data}
            dataSetter={item.dataSetter}
            type={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingCreationView;
