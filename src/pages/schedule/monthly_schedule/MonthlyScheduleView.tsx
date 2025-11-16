import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns";
import { useContext } from "react";
import { DateContext } from "../DataContext";

interface Props {
  schedules: any[];
  setFetchStandardDate: React.Dispatch<React.SetStateAction<string>>;
}

const MonthlyScheduleView = ({ schedules, setFetchStandardDate }: Props) => {
  const { year, month } = useContext(DateContext);
  const activeStartDate = new Date(year, month - 1, 1);
  // console.log(schedules);
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
          setFetchStandardDate((prev) => {
            const newStandardDate = `${getYear(activeStartDate)} ${getMonth(activeStartDate) + 1}`;
            if (prev !== newStandardDate) {
              return newStandardDate;
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
