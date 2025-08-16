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
    (dataSetter as React.Dispatch<React.SetStateAction<string>>)((prev) => {
      if (!prev) {
        // 초기값인 경우
        return clickedDay;
      } else if (prev.includes("T")) {
        // 날짜+시간이 이미 입력된 경우
        return `${clickedDay}T${prev?.split("T")[1]}`;
      } else {
        // 시간만 입력된 경우
        return `${clickedDay}T${prev}`;
      }
    });
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
