import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";
import { useState } from "react";
import { createMeeting } from "@/apis/meeting/meetingAPI";

export interface MeetingSendData {
  title: string;
  description: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: string;
  projectId: string;
}

const MeetingCreationPage = () => {
  const [allDataReserved, setAllDataReserved] = useState<boolean>(false);
  const [completeData, setCompleteData] = useState<MeetingSendData>();

  // useEffect(() => {
  //   console.log(completeData);
  // }, [completeData]);

  return (
    <div className={styles.meetingCreationPage}>
      <TopNav type="text" label="미팅 생성" />
      <div className={styles.meetingCreationPage__contents}>
        <MeetingCreationView
          setAllDataReserved={setAllDataReserved}
          setCompleteData={setCompleteData}
        />
        <Button
          className={allDataReserved ? styles.active : styles.inactive}
          label={"미팅 생성하기"}
          clickHandler={() => createMeeting(completeData)}
        />
      </div>
    </div>
  );
};

export default MeetingCreationPage;
