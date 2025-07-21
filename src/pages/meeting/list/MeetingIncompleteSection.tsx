import { useAPIs } from "@/apis/useAPIs";
import styles from "./MeetingIncompleteSection.module.scss";
import MeetingItemCard from "./MeetingItemCard";
import type { MeetingDataType } from "@/types/meeting-data-type";

const MeetingIncompleteSection = () => {
  const userId = 3;
  const { response: dataSet, loading, error } = useAPIs(`/meeting_list?id=${userId}`);
  const incompleteData = dataSet?.data
    .filter((item: MeetingDataType) => {
      return item.meeting_status === "생성중" || item.meeting_status === "실패";
    })
    .sort((a, b) => b.meeting_status.localeCompare(a.meeting_status));

  return (
    <div className={styles.meetingIncompleteSection}>
      <div className={styles.meetingIncompleteSection__label}>매칭 완료 미팅</div>
      {/* <Carousel
        dataSet={incompleteData}
        renderItem={(data, index) => <CarouselItem key={index} data={data} />}
      /> */}
      <div className={styles.meetingIncompleteSection__list}>
        {incompleteData?.map((item, _) => (
          <MeetingItemCard key={item.meeting_id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingIncompleteSection;
