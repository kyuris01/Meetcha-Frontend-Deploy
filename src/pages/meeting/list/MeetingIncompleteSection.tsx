import { useEffect, useState } from "react";
import styles from "./MeetingIncompleteSection.module.scss";
import MeetingItemCard from "./MeetingItemCard";
import type { Meeting } from "@/apis/meeting/meetingTypes";
import { isBefore } from "date-fns";

const MeetingIncompleteSection = ({ meetingList }: { meetingList: Meeting[] }) => {
  const [incompleteMeetings, setIncompleteMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    setIncompleteMeetings(
      meetingList
        .filter((item: Meeting) => {
          return item.meetingStatus === "MATCHING";
        })
        .sort((a, b) => (isBefore(a.deadline, b.deadline) ? 1 : -1))
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
