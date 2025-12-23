import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns";
import { useContext } from "react";
import { DateContext } from "../DataContext";
import type { UserScheduleData } from "@/apis/participate/participateTypes";

interface Props {
  schedules: UserScheduleData[];
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  const { year, month, setYear, setMonth } = useContext(DateContext);
  const activeStartDate = new Date(year, month - 1, 1);

  return (
    <div className="monthlyScheduleView">
      <Calendar
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          const eventName = [];

          schedules &&
            schedules.map((schedule) => {
              const date1 = dateFormatter(new Date(schedule.startAt)); // 서버에서 받아온 일정의 날짜
              const date2 = dateFormatter(new Date(date));

              if (date1 === date2) {
                eventName.push(schedule.title);
              }
            });
          return <EventTagBox eventName={eventName} />;
        }}
        formatDay={(_, date) => {
          return date.toLocaleString("en", { day: "numeric" });
        }}
        formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
        onActiveStartDateChange={({ activeStartDate, view }) => {
          setYear((prev) => {
            const newYear = getYear(activeStartDate);
            if (prev !== newYear) {
              return newYear;
            } else {
              return prev;
            }
          });
          setMonth((prev) => {
            const newMonth = getMonth(activeStartDate);
            if (prev !== newMonth) {
              return newMonth;
            } else {
              return prev;
            }
          });
          // setFetchStandardDate((prev) => {
          //   const newStandardDate = `${getYear(activeStartDate)} ${getMonth(activeStartDate) + 1}`;
          //   if (prev !== newStandardDate) {
          //     return newStandardDate;
          //   } else {
          //     return prev;
          //   }
          // });
        }}
      />
    </div>
  );
};

export default MonthlyScheduleView;
