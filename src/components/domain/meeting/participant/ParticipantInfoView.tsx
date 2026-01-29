import type { Participant } from "@/apis/meeting/meetingTypes";
import styles from "./ParticipantInfoView.module.scss";
import ParticipantItemCard from "./ParticipantItemCard";

interface Props {
  data: Participant[];
}

const ParticipantInfoView = ({ data }: Props) => {
  return (
    <div className={styles.participantInfoView}>
      <div className={styles.participantInfoView__participantList}>
        {data.map((item) => (
          <ParticipantItemCard data={item} key={item.participantId} />
        ))}
      </div>
    </div>
  );
};

export default ParticipantInfoView;
