import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { CustomEvent } from "./CustomEvent";
import "./WeeklyCalendar.scss";
import CustomWeekHeader from "./CustomWeekHeader";
import { colorAutoSelector } from "@/utils/colorAutoSelector";

interface Props {
  schedules: any[];
}

const localizer = luxonLocalizer(DateTime);

const formats = {
  timeGutterFormat: (date: Date, culture: string, localizer: any) => {
    return DateTime.fromJSDate(date).toFormat("H"); // 예: 22
  },
};

const WeeklyScheduleView = ({ schedules }: Props) => {
  const events = schedules.map((item, index) => ({
    id: item.id,
    title: item.scheduleName,
    start: new Date(`${item.date}T${item.startTime}`),
    end: new Date(`${item.date}T${item.endTime}`),
  }));

  return (
    <Calendar
      localizer={localizer}
      events={events}
      formats={formats}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={["week"]}
      components={{
        week: {
          header: CustomWeekHeader,
          event: CustomEvent,
        },
      }}
      eventPropGetter={(event) => {
        console.log(event.id);
        return {
          style: {
            backgroundColor: `${colorAutoSelector(event.id)}`,
            borderRadius: "6px",
            color: "white",
          },
        };
      }}
    />
  );
};

export default WeeklyScheduleView;
