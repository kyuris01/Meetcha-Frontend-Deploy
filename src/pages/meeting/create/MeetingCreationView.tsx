import React, { useEffect, useState } from "react";
import styles from "./MeetingCreationView.module.scss";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingSendData } from "./MeetingCreationPage";
import { cardDataSet } from "./constants/MeetingCreation.constants";
import { deadlineParse, durationMinutesParse, projectDataParse } from "@/utils/MeetingCreationUtils";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingSendData>>;
}

const MeetingCreationView = ({ setAllDataReserved, setCompleteData }: Props) => {
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>("");
  const [meetingCandidateDates, setMeetingCandidateDates] = useState<string[]>([]);
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [projectData, setProjectData] = useState<string>(null);
  const [clickedCardNum, setClickedCardNum] = useState<number>(null); // 미팅 카드 중 유저가 클릭한 카드의 번호

  const stateMapping = {
    description: { data: meetingDescription, dataSetter: setMeetingDescription },
    candidateDates: { data: meetingCandidateDates, dataSetter: setMeetingCandidateDates },
    durationMinutes: { data: durationMinutes, dataSetter: setDurationMinutes },
    deadline: { data: deadline, dataSetter: setDeadline },
    project: { data: projectData, dataSetter: setProjectData },
  };

  useEffect(() => {
    if (meetingTitle && meetingCandidateDates.length > 0 && durationMinutes && deadlineParse(deadline)) {
      setAllDataReserved(true);
      setCompleteData({
        title: meetingTitle,
        description: meetingDescription,
        candidateDates: meetingCandidateDates,
        durationMinutes: durationMinutesParse(durationMinutes),
        deadline: deadlineParse(deadline),
        projectId: projectDataParse(projectData),
      });
    }
  }, [meetingTitle, meetingDescription, meetingCandidateDates, durationMinutes, deadline, projectData]);

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
            data={stateMapping[item.stateKey as keyof typeof stateMapping].data}
            dataSetter={stateMapping[item.stateKey as keyof typeof stateMapping].dataSetter}
            type={item.id}
            clickedCardNum={clickedCardNum}
            setCardClickedNum={setClickedCardNum}
            meetingCandidateDates={meetingCandidateDates}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingCreationView;
