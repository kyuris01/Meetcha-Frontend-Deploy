import styles from "./ParticipantInfoPage.module.scss";
import ParticipantInfoView from "./ParticipantInfoView";
import type { Participant } from "@/apis/meeting/meetingTypes";

interface Props {
  participants: Participant[];
}

const ParticipantInfoPage = ({ participants }: Props) => {
  return (
    <div className={styles.participantInfoPage}>
      <div className={styles.participantInfoPage__title}>참여자 목록</div>
      <ParticipantInfoView data={participants} />
    </div>
  );
};

export default ParticipantInfoPage;
