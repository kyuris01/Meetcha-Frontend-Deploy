import styles from "./CustomEvent.module.scss";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";

type Props = {
  event: ParsedSchedule;
};

export const CustomEvent = ({ event }: Props) => {
  return <div className={styles.customEvent}>{event.title}</div>;
};
