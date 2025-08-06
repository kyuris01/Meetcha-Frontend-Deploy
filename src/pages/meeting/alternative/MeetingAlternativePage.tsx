import TopNav from "@/components/TopNav";
import styles from "./MeetingAlternativePage.module.scss";
import MeetingAlternativeView from "./MeetingAlternativeView";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";
import { useParams } from "react-router-dom";

const MeetingAlternativePage = () => {
  const { id } = useParams();
  const [alternativeTimes, setAlternativeTimes] = useState<string[]>([]);

  const fetchAlternativeTimes = async () => {
    const response = await apiCall(`/meeting-lists/${id}`, "GET", null, true);

    switch (response.code) {
      case 200:
        setAlternativeTimes(response.data);
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
      <MeetingAlternativeView alternativeTimes={alternativeTimes} />
    </div>
  );
};

export default MeetingAlternativePage;
