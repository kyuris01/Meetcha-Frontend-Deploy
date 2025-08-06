import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  schedules: any[];
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  // console.log(schedules);
  return (
    <div className="monthlyScheduleView">
      <Calendar
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
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        formatShortWeekday={(locale, date) => date.toLocaleString("en-US", { weekday: "short" })}
      />
    </div>
  );
};

export default MonthlyScheduleView;
