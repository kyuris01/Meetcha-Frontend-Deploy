import { useState } from "react";
import styles from "./SchedulePage.module.scss";
import MonthlyScheduleView from "./monthly_schedule/MonthlyScheduleView";
import WeeklyScheduleView from "./weekly_schedule/WeeklyScheduleView";
import WriteButton from "@assets/writeButton.svg?react";
import { useAPIs } from "@/apis/useAPIs";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const [viewNum, setViewNum] = useState<number>(0);
  const navigate = useNavigate();

  const userId = "11";
  const { response: schedules, loading, error } = useAPIs(`/schedules?userid=${userId}`);
  console.log(schedules);
  return (
    <div className={styles.schedulePage}>
      <div className={styles.schedulePage__viewBox}>
        <div className={styles.schedulePage__viewBox__buttonContainer}>
          <div
            onClick={() => setViewNum(0)}
            className={
              viewNum === 0
                ? `${styles.active} ${styles.schedulePage__viewBox__buttonContainer__button}`
                : styles.schedulePage__viewBox__buttonContainer__button
            }
          >
            Monthly
          </div>
          <div
            onClick={() => setViewNum(1)}
            className={
              viewNum === 1
                ? `${styles.active} ${styles.schedulePage__viewBox__buttonContainer__button}`
                : styles.schedulePage__viewBox__buttonContainer__button
            }
          >
            Weekly
          </div>
        </div>
        {viewNum === 0 ? (
          <MonthlyScheduleView schedules={schedules} />
        ) : (
          <WeeklyScheduleView schedules={schedules} />
        )}
      </div>
      <WriteButton className={styles.writeButton} onClick={() => navigate("/meeting-creation")} />
    </div>
  );
};

export default SchedulePage;
