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
          return item.meetingStatus === "MATCHING"||item.meetingStatus==="MATCH_FAILED";
        })
        .sort((a,b)=>{
          const priority:Record<string,number>={
            "MATCHING":1,
            "MATCH_FAILED":2, 
          };
          const diff=priority[a.meetingStatus]-priority[b.meetingStatus];
          if(diff!==0) return diff;

          return isBefore(a.deadline,b.deadline)?-1:1;
        })
        
    );
  }, [meetingList]);

  return (
    <div className={styles.meetingIncompleteSection}>
      <div className={styles.meetingIncompleteSection__label}>매칭 중인 미팅</div>
      <div className={styles.meetingIncompleteSection__list}>
        {incompleteMeetings?.map((item, _) => (
          <MeetingItemCard key={item.meetingId} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingIncompleteSection;
