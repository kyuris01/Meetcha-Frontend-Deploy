import { useState } from "react";
import styles from "./SchedulePage.module.scss";
import MonthlyScheduleView from "./monthly_schedule/MonthlyScheduleView";
import WeeklyScheduleView from "./weekly_schedule/WeeklyScheduleView";
import { getMonth, getYear } from "date-fns";
import { useSchedules } from "@/hooks/useSchedules";
import { CALENDAR, type Calendar } from "./calendarType.constants";
import CalendarHeader from "./CalendarHeader";
import { DateContext } from "./DataContext";

const SchedulePage = () => {
  const [calendarType, setCalendarType] = useState<Calendar>(CALENDAR.Monthly);

  /** 달이 바뀔 때 api 호출을 위한 month 상태 변수 */
  const [fetchStandardDate, setFetchStandardDate] = useState<string>(
    `${getYear(new Date())} ${getMonth(new Date()) + 1}`
  );
  const [initYear, initMonth] = fetchStandardDate.split(" ");
  const [year, setYear] = useState<string>(initYear);
  const [month, setMonth] = useState<string>(initMonth);

  const {
    data: schedules,
    isLoading,
    isError,
    error,
    forceRefresh,
    refetch,
  } = useSchedules(year, month);

  return (
    <DateContext.Provider value={{ year, month, setYear, setMonth }}>
      <div className={styles.schedulePage}>
        <div className={styles.schedulePage__viewBox}>
          <CalendarHeader calendarType={calendarType} setCalendarType={setCalendarType} />
          {calendarType === CALENDAR.Monthly ? (
            <MonthlyScheduleView
              schedules={schedules}
              setFetchStandardDate={setFetchStandardDate}
            />
          ) : (
            <WeeklyScheduleView schedules={schedules} setFetchStandardDate={setFetchStandardDate} />
          )}
        </div>
      </div>
    </DateContext.Provider>
  );
};

export default SchedulePage;
