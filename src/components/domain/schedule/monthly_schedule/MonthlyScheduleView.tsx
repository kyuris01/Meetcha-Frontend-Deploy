import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns";
import { useScheduleDate } from "../DateContext";
import type { UserScheduleData } from "@/apis/participate/participateTypes";

interface Props {
  schedules: UserScheduleData[];
}

export interface Event {
  id: string;
  name: string;
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  const { year, month, setYear, setMonth } = useScheduleDate();
  const activeStartDate = new Date(year, month - 1, 1);

  return (
    <div className="monthlyScheduleView">
      <Calendar
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={({ date }) => {
          const eventNames: Event[] = [];

          schedules?.forEach((schedule) => {
            const date1 = dateFormatter(new Date(schedule.startAt)); // 서버에서 받아온 일정의 날짜
            const date2 = dateFormatter(new Date(date));

            if (date1 === date2) {
              eventNames.push({ id: schedule.eventId, name: schedule.title });
            }
          });
          return <EventTagBox eventNames={eventNames} />;
        }}
        formatDay={(_, date) => {
          return date.toLocaleString("en", { day: "numeric" });
        }}
        formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
        onActiveStartDateChange={({ activeStartDate }) => {
          setYear((prev) => {
            const newYear = getYear(activeStartDate as Date);
            if (prev !== newYear) {
              return newYear;
            } else {
              return prev;
            }
          });
          setMonth((prev) => {
            const newMonth = getMonth(activeStartDate as Date);
            if (prev !== newMonth) {
              return newMonth;
            } else {
              return prev;
            }
          });
        }}
      />
    </div>
  );
};

export default MonthlyScheduleView;
