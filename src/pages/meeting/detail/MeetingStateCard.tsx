import { type ReactNode } from "react";
import styles from "./MeetingStateCard.module.scss";
import RunningMatching from "@assets/runningMatching.svg?react";
import CompletedMatching from "@assets/completedMatching.svg?react";
import FailedMatching from "@assets/failedMatching.svg?react";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";

interface Props {
  data: MeetingDetail;
}

type MeetingStatus = MeetingDetail["meetingStatus"];

const UI_BY_STATUS: Partial<
  Record<
    MeetingStatus,
    {
      text: string;
      className: string;
      icon: ReactNode;
    }
  >
> = {
  MATCHING: {
    text: "매칭 중",
    className: styles.running,
    icon: <RunningMatching className={styles.running} />,
  },
  MATCH_FAILED: {
    text: "매칭 실패",
    className: styles.fail,
    icon: <FailedMatching className={styles.fail} />,
  },
  BEFORE: {
    text: "매칭 완료",
    className: styles.complete,
    icon: <CompletedMatching className={styles.complete} />,
  },
};

const MeetingStateCard = ({ data }: Props) => {
  const ui = UI_BY_STATUS[data.meetingStatus];

  if (!ui) return null;

  return (
    <div className={`${styles.meetingStateCard} ${ui.className}`}>
      {ui.icon}
      {ui.text}
    </div>
  );
};

export default MeetingStateCard;
