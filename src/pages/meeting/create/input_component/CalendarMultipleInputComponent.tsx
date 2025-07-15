import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarMultipleInputComponent.scss";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}
const CalendarMultipleInputComponent = ({ dataSetter }: Props) => {
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
      />
    </div>
  );
};

export default CalendarMultipleInputComponent;
