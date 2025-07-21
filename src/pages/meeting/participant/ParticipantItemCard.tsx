import React from "react";
import styles from "./ParticipantItemCard.module.scss";

interface Props {
  data: any;
}

const ParticipantItemCard = ({ data }: Props) => {
  return (
    <div className={styles.participantItemCard}>
      <div className={styles.participantItemCard__leftEdge}></div>
      <div className={styles.participantItemCard__dataArea}>
        <img
          className={styles.participantItemCard__dataArea__profileImg}
          src="https://picsum.photos/200"
          alt=""
        />
        {data}
      </div>
    </div>
  );
};

export default ParticipantItemCard;
