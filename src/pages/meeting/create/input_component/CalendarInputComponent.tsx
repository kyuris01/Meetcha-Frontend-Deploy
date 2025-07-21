import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarInputComponent.scss";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}
const CalendarInputComponent = ({ dataSetter }: Props) => {
  const [clickedDay, setClickedDay] = useState<string>();

  useEffect(() => {
    (dataSetter as React.Dispatch<React.SetStateAction<string>>)(clickedDay);
  }, [clickedDay]);

  return (
    <div className="calendarInputComponent">
      <Calendar
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        onClickDay={(value) => {
          setClickedDay(dateFormatter(value));
        }}
        tileClassName={({ date, view }) => {
          if (clickedDay === dateFormatter(date)) {
            return "custom-active";
          }
        }}
      />
    </div>
  );
};

export default CalendarInputComponent;
