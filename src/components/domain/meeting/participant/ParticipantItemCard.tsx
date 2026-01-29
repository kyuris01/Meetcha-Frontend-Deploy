import styles from "./ParticipantItemCard.module.scss";
import type { Participant } from "@/apis/meeting/meetingTypes";

interface Props {
  data: Participant;
}

const ParticipantItemCard = ({ data }: Props) => {
  return (
    <div className={styles.participantItemCard}>
      <div className={styles.participantItemCard__leftEdge}></div>
      <div className={styles.participantItemCard__dataArea}>
        <img
          className={styles.participantItemCard__dataArea__profileImg}
          src={data.profileImageSrc}
          alt="참여자 프로필 이미지"
        />
        {data.nickname}
      </div>
    </div>
  );
};

export default ParticipantItemCard;
