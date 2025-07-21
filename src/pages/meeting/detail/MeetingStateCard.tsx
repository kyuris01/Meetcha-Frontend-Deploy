import React, { useEffect, useState, type ReactNode } from "react";
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
      case "진행중":
        setText("매칭 완료");
        setIcon(<CompletedMatching className={styles.complete} />);
        setStyle(styles.complete);
        break;
      case "생성중":
        setText("매칭 중");
        setIcon(<RunningMatching className={styles.running} />);
        setStyle(styles.running);
        break;
      case "실패":
        setText("매칭 실패");
        setIcon(<FailedMatching className={styles.fail} />);
        setStyle(styles.fail);
    }
  };

  useEffect(() => {
    console.log(meeting_status);
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
