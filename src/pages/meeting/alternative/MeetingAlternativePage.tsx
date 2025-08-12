import TopNav from "@/components/TopNav";
import styles from "./MeetingAlternativePage.module.scss";
import MeetingAlternativeView from "./MeetingAlternativeView";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";
import { useParams } from "react-router-dom";
import type { AlternativeScheduleDataType } from "@/types/meeting-data-type";

const MeetingAlternativePage = () => {
  const { id } = useParams();
  const [alternativeTimes, setAlternativeTimes] = useState<AlternativeScheduleDataType[]>([]);

  const fetchAlternativeTimes = async () => {
    const response = await apiCall(`/meeting-lists/${id}/alternative-times`, "GET", null, true);
    console.log("data:", response.data);
    switch (response.code) {
      case 200:
        setAlternativeTimes(response.data.alternativeTimes);
        break;
      default:
        alert(response.message);
    }
  };

  useEffect(() => {
    fetchAlternativeTimes();
  }, []);

  return (
    <div className={styles.meetingAlternativePage}>
      <TopNav className={styles.topNav} />
      <MeetingAlternativeView alternativeTimes={alternativeTimes} meetingId={id} />
    </div>
  );
};

export default MeetingAlternativePage;
