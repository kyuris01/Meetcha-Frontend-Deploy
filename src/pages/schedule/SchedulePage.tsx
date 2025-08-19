import { useEffect, useRef, useState } from "react";
import styles from "./SchedulePage.module.scss";
import MonthlyScheduleView from "./monthly_schedule/MonthlyScheduleView";
import WeeklyScheduleView from "./weekly_schedule/WeeklyScheduleView";
import { getMonth, getYear } from "date-fns";
import { useSchedules } from "@/hooks/useSchedules";

const SchedulePage = () => {
  const [viewNum, setViewNum] = useState<number>(0);
  const [fetchStandardDate, setFetchStandardDate] = useState<string>(
    `${getYear(new Date())} ${getMonth(new Date()) + 1}`
  ); // 달이 바뀔 때 api 호출을 위한 month 상태 변수
  const [year, month] = fetchStandardDate.split(" ");

  const {
    data: schedules,
    isLoading,
    isError,
    error,
    forceRefresh,
    refetch,
  } = useSchedules(year, month);

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
          <MonthlyScheduleView schedules={schedules} setFetchStandardDate={setFetchStandardDate} />
        ) : (
          <WeeklyScheduleView schedules={schedules} setFetchStandardDate={setFetchStandardDate} />
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
