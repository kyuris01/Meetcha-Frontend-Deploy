import { useEffect } from "react";
import styles from "./HomePage.module.scss";
import MeetingIncompleteSection from "../meeting/list/MeetingIncompleteSection";
import MeetingCompleteSection from "../meeting/list/MeetingCompleteSection";
import { useMeetingStore } from "@/store/meetingStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

  useEffect(() => {
    const userId = 3;
    fetchMeetings(userId);
  }, []);

  return (
    <div className={styles.homePage}>
      <MeetingCompleteSection />
      <MeetingIncompleteSection />
    </div>
  );
};

export default HomePage;
