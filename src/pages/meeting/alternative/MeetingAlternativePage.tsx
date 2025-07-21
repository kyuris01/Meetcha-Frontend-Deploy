import TopNav from "@/components/TopNav";
import styles from "./MeetingAlternativePage.module.scss";
import MeetingAlternativeView from "./MeetingAlternativeView";

const MeetingAlternativePage = () => {
  return (
    <div className={styles.meetingAlternativePage}>
      <TopNav className={styles.topNav} />
      <MeetingAlternativeView />
    </div>
  );
};

export default MeetingAlternativePage;
