import type { Meeting } from "@/apis/meeting/meetingTypes";
import styles from "./MeetingCompleteSection.module.scss";
import MeetingItemCard from "./MeetingItemCard";
import { isBefore } from "date-fns";

const MeetingCompleteSection = ({ meetingList }: { meetingList: Meeting[] }) => {
  const completeDataList = meetingList
    ?.filter((item) => {
      return item.meetingStatus === "BEFORE";
    })
    .sort((a, b) => {
      return isBefore(a.deadline, b.deadline) ? -1 : 1;
    });

  return (
    <div className={styles.meetingCompleteSection}>
      <div className={styles.meetingCompleteSection__label}>매칭 완료 미팅</div>
      <div className={styles.meetingCompleteSection__meetingList}>
        {completeDataList.map((item, _) => (
          <MeetingItemCard key={item.meetingId} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingCompleteSection;
