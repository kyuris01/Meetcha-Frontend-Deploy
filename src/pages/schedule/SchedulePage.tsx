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

  const now = new Date();
  const [year, setYear] = useState<number>(getYear(now));
  const [month, setMonth] = useState<number>(getMonth(now) + 1);

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
            <MonthlyScheduleView schedules={schedules} />
          ) : (
            <WeeklyScheduleView schedules={schedules} />
          )}
        </div>
      </div>
    </DateContext.Provider>
  );
};

export default SchedulePage;
