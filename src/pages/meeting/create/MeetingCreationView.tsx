import React, { useEffect, useState } from "react";
import styles from "./MeetingCreationView.module.scss";
import Pencil from "@assets/pencil.svg?react";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import Watch from "@assets/watch.svg?react";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingSendData } from "./MeetingCreationPage";
import { parse } from "date-fns/parse";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingSendData>>;
}

const MeetingCreationView = ({ setAllDataReserved, setCompleteData }: Props) => {
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>();
  const [meetingCandidateDates, setMeetingCandidateDates] = useState<string[]>();
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [projectData, setProjectData] = useState<string>("");

  const cardDataSet = [
    {
      id: 0,
      title: "미팅 설명",
      icon: <Pencil />,
      data: meetingDescription,
      dataSetter: setMeetingDescription,
    },
    {
      id: 1,
      title: "미팅 후보 날짜",
      icon: <Calendar />,
      data: meetingCandidateDates,
      dataSetter: setMeetingCandidateDates,
    },
    {
      id: 2,
      title: "미팅 진행 시간",
      icon: <Clock />,
      data: durationMinutes,
      dataSetter: setDurationMinutes,
    },
    {
      id: 3,
      title: "투표 마감 시간",
      icon: <Watch />,
      data: deadline,
      dataSetter: setDeadline,
    },
    {
      id: 4,
      title: "프로젝트",
      icon: <Watch />,
      data: projectData,
      dataSetter: setProjectData,
    },
  ];
  //
  const projectDataParse = (project) => {
    const index = project.indexOf(" ");
    return project.slice(0, index);
  };

  const durationMinutesParse = (durationMinutes) => {
    const parsedDate = parse(durationMinutes, "HH:mm", new Date()); // duration은 숫자로 파싱하면서 총 "분"으로 변환
    return parsedDate.getHours() * 60 + parsedDate.getMinutes();
  };
  //
  useEffect(() => {
    if (
      meetingTitle &&
      meetingDescription &&
      meetingCandidateDates &&
      durationMinutes &&
      deadline
    ) {
      setAllDataReserved(true);

      setCompleteData({
        title: meetingTitle,
        description: meetingDescription,
        candidateDates: meetingCandidateDates,
        durationMinutes: durationMinutesParse(durationMinutes),
        deadline: deadline,
        projectId: projectDataParse(projectData),
      });
    }
  }, [
    meetingTitle,
    meetingDescription,
    meetingCandidateDates,
    durationMinutes,
    deadline,
    projectData,
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
        {cardDataSet.map((item, _) => (
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
