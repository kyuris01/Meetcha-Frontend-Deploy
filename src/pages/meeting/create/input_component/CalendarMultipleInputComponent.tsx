import { useEffect, useState, type ComponentProps } from "react";
import Calendar from "react-calendar";
import "./CalendarMultipleInputComponent.scss";
import { dateFormatter } from "@/utils/dateFormatter";
import { isPreviousDate } from "@/utils/MeetingOptionCardUtils";

interface Props extends Omit<ComponentProps<typeof Calendar>, "onClickDay" | "tileClassName" | "formatDay"> {
  dataSetter: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string[]>>;
}
const CalendarMultipleInputComponent = ({ dataSetter, ...restProps }: Props) => {
  const [clickedDays, setClickedDays] = useState<string[]>([]);

  const clickDaySaver = (value: Date) => {
    const clickedDay = dateFormatter(value);
    if (clickedDays.includes(clickedDay)) {
      setClickedDays((prevClickedDays) => prevClickedDays.filter((day) => day !== clickedDay));
      return;
    }
    setClickedDays((prevClickedDays) => [...prevClickedDays, clickedDay]);
  };

  useEffect(() => {
    (dataSetter as React.Dispatch<React.SetStateAction<string[]>>)(clickedDays);
  }, [clickedDays]);

  return (
    <div className="calendarMultipleInputComponent">
      <Calendar
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        onClickDay={clickDaySaver}
        tileClassName={({ date, view }) => {
          if (clickedDays.includes(dateFormatter(date))) {
            return "custom-active";
          }
        }}
        // {...restProps}
        tileDisabled={({ date }) => isPreviousDate(date)}
      />
    </div>
  );
};

export default CalendarMultipleInputComponent;
