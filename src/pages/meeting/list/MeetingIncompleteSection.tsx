import { useEffect, useState } from "react";
import styles from "./MeetingIncompleteSection.module.scss";
import MeetingItemCard from "./MeetingItemCard";
import type { MeetingDataType } from "@/types/meeting-data-type";

const MeetingIncompleteSection = ({ meetingList }: { meetingList: MeetingDataType[] }) => {
  const [incompleteMeetings, setIncompleteMeetings] = useState<MeetingDataType[]>([]);

  useEffect(() => {
    setIncompleteMeetings(
      meetingList
        .filter((item: MeetingDataType) => {
          return item.meetingStatus === "매칭 중" || item.meetingStatus === "매칭 실패";
        })
        .sort((a, b) => a.meetingStatus.localeCompare(b.meetingStatus))
    );
  }, [meetingList]);

  return (
    <div className={styles.meetingIncompleteSection}>
      <div className={styles.meetingIncompleteSection__label}>매칭 중인 미팅</div>
      {/* <Carousel
        dataSet={incompleteData}
        renderItem={(data, index) => <CarouselItem key={index} data={data} />}
      /> */}
      <div className={styles.meetingIncompleteSection__list}>
        {incompleteMeetings?.map((item, _) => (
          <MeetingItemCard key={item.meetingId} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingIncompleteSection;
