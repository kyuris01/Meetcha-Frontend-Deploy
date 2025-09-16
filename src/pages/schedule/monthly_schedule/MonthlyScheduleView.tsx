import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns";

interface Props {
  schedules: any[];
  setFetchStandardDate: React.Dispatch<React.SetStateAction<string>>;
}

const MonthlyScheduleView = ({ schedules, setFetchStandardDate }: Props) => {
  // console.log(schedules);
  return (
    <div className="monthlyScheduleView">
      <Calendar
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          const eventName = new Array();

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
          // console.log(date);
          return date.toLocaleString("en", { day: "numeric" });
        }}
        formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
        onActiveStartDateChange={({ activeStartDate, view }) => {
          setFetchStandardDate((prev) => {
            const newStandardDate = `${getYear(activeStartDate)} ${getMonth(activeStartDate) + 1}`;
            if (prev !== newStandardDate) {
              // console.log(getMonth(activeStartDate) + 1);
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
