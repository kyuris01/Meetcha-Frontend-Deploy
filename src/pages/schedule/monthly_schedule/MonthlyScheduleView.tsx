import Calendar from "react-calendar";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  schedules: any[];
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  return (
    <div className="monthlyScheduleView">
      <Calendar
        tileContent={({ date, view }) => {
          const eventName = new Array();

          schedules &&
            schedules?.map((user) => {
              if (user.date === dateFormatter(date)) {
                eventName.push(user.scheduleName);
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
