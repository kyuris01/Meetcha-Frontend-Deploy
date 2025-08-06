import React from "react";
import styles from "./ParticipantInfoView.module.scss";
import ParticipantItemCard from "./ParticipantItemCard";
import type { Participant } from "@/types/meeting-data-type";

interface Props {
  data: Participant[];
}

const ParticipantInfoView = ({ data }: Props) => {
  return (
    <div className={styles.participantInfoView}>
      <div className={styles.participantInfoView__participantList}>
        {data.map((item, _) => (
          <ParticipantItemCard data={item.nickname} key={item.participantId} />
        ))}
      </div>
    </div>
  );
};

export default ParticipantInfoView;
