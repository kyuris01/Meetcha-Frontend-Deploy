import { useEffect, useState } from "react";
import styles from "./CountDown.module.scss";
import { differenceInDays, intervalToDuration, isBefore } from "date-fns";

interface Props {
  label: string;
  finishTime: Date;
}

const CountDown = ({ label, finishTime }: Props) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    function tick() {
      const now = new Date();
      if (isBefore(finishTime, now)) {
        setTimeLeft({ days: "0", hours: "00", minutes: "00", seconds: "00" });
        return; // 만료 후 0 유지
      }
      const dateDifference = differenceInDays(finishTime, now);
      const timeDifference = intervalToDuration({ start: now, end: finishTime });
      setTimeLeft({
        days: String(dateDifference) ?? "0",
        hours: String(timeDifference.hours ?? 0).padStart(2, "0"),
        minutes: String(timeDifference.minutes ?? 0).padStart(2, "0"),
        seconds: String(timeDifference.seconds ?? 0).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.CountDown}>
      <div className={styles.CountDown__label}>{label}</div>
      <div className={styles.CountDown__time}>
        {timeLeft.days}일 {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </div>
    </div>
  );
};

export default CountDown;
