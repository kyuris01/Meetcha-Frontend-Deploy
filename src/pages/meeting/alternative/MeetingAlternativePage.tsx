import TopNav from "@/components/common/TopNav";
import styles from "./MeetingAlternativePage.module.scss";
import MeetingAlternativeView from "../../../components/domain/meeting/alternative/MeetingAlternativeView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAlternativeMeeting } from "@/apis/meeting/meetingAPI";
import type { AlternativeMeeting } from "@/apis/meeting/meetingTypes";

const MeetingAlternativePage = () => {
  const { id } = useParams();
  const [alternativeTimes, setAlternativeTimes] = useState<AlternativeMeeting[]>([]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const res = await fetchAlternativeMeeting(id);
      setAlternativeTimes(res);
    };
    load();
  }, [id]);

  if (!id) return null;

  return (
    <div className={styles.meetingAlternativePage}>
      <TopNav className={styles.topNav} />
      <MeetingAlternativeView alternativeTimes={alternativeTimes} meetingId={id} />
    </div>
  );
};

export default MeetingAlternativePage;
