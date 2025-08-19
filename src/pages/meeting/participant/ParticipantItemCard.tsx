import React from "react";
import styles from "./ParticipantItemCard.module.scss";
import type { Participant } from "@/apis/meeting/meetingTypes";

interface Props {
  data: Participant;
}

const ParticipantItemCard = ({ data }: Props) => {
  console.log("data:", data);
  return (
    <div className={styles.participantItemCard}>
      <div className={styles.participantItemCard__leftEdge}></div>
      <div className={styles.participantItemCard__dataArea}>
        <img
          className={styles.participantItemCard__dataArea__profileImg}
          src={data.profileImageUrl}
          alt=""
        />
        {data.nickname}
      </div>
    </div>
  );
};

export default ParticipantItemCard;
