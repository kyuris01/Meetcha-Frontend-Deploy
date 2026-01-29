import React from "react";
import styles from "./MeetingInfoCard.module.scss";

interface Props {
  title: string;
  desc: string;
}

const MeetingInfoCard = ({ title, desc }: Props) => {
  return (
    <div className={styles.meetingItemCard}>
      <div className={styles.meetingItemCard__leftEdge}></div>
      <div className={styles.meetingItemCard__dataArea}>
        <div className={styles.meetingItemCard__dataArea__meetingName}>{title}</div>
        <div className={styles.meetingItemCard__dataArea__meetingDesc}>{desc}</div>
      </div>
    </div>
  );
};

export default MeetingInfoCard;
