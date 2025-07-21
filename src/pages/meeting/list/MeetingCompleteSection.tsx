import styles from "./MeetingCompleteSection.module.scss";
import { useMeetingStore } from "@/store/meetingStore";
import MeetingItemCard from "./MeetingItemCard";
import type { MeetingDataType } from "@/types/meeting-data-type";

const MeetingCompleteSection = () => {
  const meetingList: MeetingDataType[] = useMeetingStore((state) => state.meetingList);
  const completeDataList = meetingList?.filter((item) => {
    return item.meeting_status === "진행중";
  });

  return (
    <div className={styles.meetingCompleteSection}>
      <div className={styles.meetingCompleteSection__label}>매칭 중인 미팅</div>
      <div className={styles.meetingCompleteSection__meetingList}>
        {completeDataList.map((item, _) => (
          <MeetingItemCard key={item.meeting_id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingCompleteSection;
