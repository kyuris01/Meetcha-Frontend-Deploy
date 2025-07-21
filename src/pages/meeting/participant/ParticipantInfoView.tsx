import React from "react";
import styles from "./ParticipantInfoView.module.scss";
import ParticipantItemCard from "./ParticipantItemCard";

interface Props {
  data: any;
}

const ParticipantInfoView = ({ data }: Props) => {
  return (
    <div className={styles.participantInfoView}>
      <div className={styles.participantInfoView__meetingName}>{data.name}</div>
      <div className={styles.participantInfoView__participantList}>
        {data.participants.map((item, _) => (
          <ParticipantItemCard data={item.name} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ParticipantInfoView;
