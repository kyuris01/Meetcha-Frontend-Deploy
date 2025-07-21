import { useEffect } from "react";
import styles from "./ParticipantInfoPage.module.scss";
import ParticipantInfoView from "./ParticipantInfoView";

interface Props {
  participants: [];
}

const ParticipantInfoPage = ({ participants }: Props) => {
  useEffect(() => {});
  return (
    <div className={styles.participantInfoPage}>
      <div className={styles.participantInfoPage__title}>참여자 목록</div>
      <ParticipantInfoView data={participants} />
    </div>
  );
};

export default ParticipantInfoPage;
