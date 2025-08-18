import { useEffect, useState, type ReactNode } from "react";
import styles from "./MeetingStateCard.module.scss";
import RunningMatching from "@assets/runningMatching.svg?react";
import CompletedMatching from "@assets/completedMatching.svg?react";
import FailedMatching from "@assets/failedMatching.svg?react";

interface Props {
  meeting_status: string;
}

const MeetingStateCard = ({ meeting_status }: Props) => {
  const [text, setText] = useState<string>();
  const [icon, setIcon] = useState<ReactNode>();
  const [style, setStyle] = useState<string>();

  const stateResolver = () => {
    switch (meeting_status) {
      case "BEFORE":
        setText("매칭 완료");
        setIcon(<CompletedMatching className={styles.complete} />);
        setStyle(styles.complete);
        break;
      case "MATCHING":
        setText("매칭 중");
        setIcon(<RunningMatching className={styles.running} />);
        setStyle(styles.running);
        break;
      case "MATCH_FAILED":
        setText("매칭 실패");
        setIcon(<FailedMatching className={styles.fail} />);
        setStyle(styles.fail);
    }
  };

  useEffect(() => {
    stateResolver();
  }, [meeting_status]);

  return (
    <div className={`${styles.meetingStateCard} ${style}`}>
      {icon}
      {text}
    </div>
  );
};

export default MeetingStateCard;
