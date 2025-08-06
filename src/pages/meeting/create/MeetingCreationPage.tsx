import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";

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

  useEffect(() => {
    console.log(completeData);
  }, [completeData]);

  const requestMeetingCreation = async () => {
    const response = await apiCall("/meeting/create", "POST", completeData, true);

    switch (response.code) {
      case 201:
        alert(response.message);
        break;
      case 400:
        const details = Object.entries(response.data)
          .map(([_, value]) => `• ${value}`)
          .join("\n");
        alert(`${response.message}\n${details}`);
        break;
      default:
        alert(response.message);
    }
  };

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
          clickHandler={requestMeetingCreation}
        />
      </div>
    </div>
  );
};

export default MeetingCreationPage;
