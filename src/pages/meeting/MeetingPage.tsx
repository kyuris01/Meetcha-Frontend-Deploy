import { useEffect } from "react";
import styles from "./MeetingPage.module.scss";
import MeetingIncompleteSection from "./list/MeetingIncompleteSection";
import MeetingCompleteSection from "./list/MeetingCompleteSection";
import { useMeetingStore } from "@/store/meetingStore";

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
