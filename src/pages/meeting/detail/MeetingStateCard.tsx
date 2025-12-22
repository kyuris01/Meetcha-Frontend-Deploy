import { useEffect, useState, type ReactNode } from "react";
import styles from "./MeetingStateCard.module.scss";
import RunningMatching from "@assets/runningMatching.svg?react";
import CompletedMatching from "@assets/completedMatching.svg?react";
import FailedMatching from "@assets/failedMatching.svg?react";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";

interface Props {
  data: MeetingDetail;
}

const MeetingStateCard = ({ data }: Props) => {
  const [text, setText] = useState<string>();
  const [icon, setIcon] = useState<ReactNode>();
  const [style, setStyle] = useState<string>();

  const stateResolver = () => {
    if (data.meetingStatus === "MATCHING") {
      setText("매칭 중");
      setIcon(<RunningMatching className={styles.running} />);
      setStyle(styles.running);
    } else if (data.meetingStatus === "MATCH_FAILED") {
      setText("매칭 실패");
      setIcon(<FailedMatching className={styles.fail} />);
      setStyle(styles.fail);
    } else if (data.meetingStatus === "BEFORE") {
      setText("매칭 완료");
      setIcon(<CompletedMatching className={styles.complete} />);
      setStyle(styles.complete);
    }
  };

  useEffect(() => {
    stateResolver();
  }, [data]);

  return (
    <div className={`${styles.meetingStateCard} ${style}`}>
      {icon}
      {text}
    </div>
  );
};

export default MeetingStateCard;
