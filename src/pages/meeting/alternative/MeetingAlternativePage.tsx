import TopNav from "@/components/TopNav";
import styles from "./MeetingAlternativePage.module.scss";
import MeetingAlternativeView from "./MeetingAlternativeView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAlternativeMeeting } from "@/apis/meeting/meetingAPI";
import type { AlternativeSchedule } from "@/apis/meeting/meetingTypes";

const MeetingAlternativePage = () => {
  const { id } = useParams();
  const [alternativeTimes, setAlternativeTimes] = useState<AlternativeSchedule[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchAlternativeMeeting(id);
      setAlternativeTimes(res);
    };
    load();
  }, []);

  return (
    <div className={styles.meetingAlternativePage}>
      <TopNav className={styles.topNav} />
      <MeetingAlternativeView alternativeTimes={alternativeTimes} meetingId={id} />
    </div>
  );
};

export default MeetingAlternativePage;
