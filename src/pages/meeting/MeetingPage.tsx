import { useEffect } from "react";
import styles from "./MeetingPage.module.scss";
import { useMeetingStore } from "@/store/meetingStore";
import MeetingCompleteSection from "@/components/domain/meeting/MeetingCompleteSection";
import MeetingIncompleteSection from "@/components/domain/meeting/MeetingIncompleteSection";

const MeetingPage = () => {
  const meetings = useMeetingStore((state) => state.meetingList);
  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className={styles.meetingPage}>
      <MeetingCompleteSection meetingList={meetings} />
      <MeetingIncompleteSection meetingList={meetings} />
    </div>
  );
};

export default MeetingPage;
