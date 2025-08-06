import styles from "./MeetingCompleteSection.module.scss";
import MeetingItemCard from "./MeetingItemCard";
import type { MeetingDataType } from "@/types/meeting-data-type";

const MeetingCompleteSection = ({ meetingList }: { meetingList: MeetingDataType[] }) => {
  const completeDataList = meetingList?.filter((item) => {
    return item.meetingStatus === "완료";
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
