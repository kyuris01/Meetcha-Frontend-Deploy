import { useEffect, useState, type ComponentProps } from "react";
import Calendar from "react-calendar";
import "./CalendarInputComponent.scss";
import { dateFormatter } from "@/utils/dateFormatter";
import { min, startOfDay } from "date-fns";

interface Props extends Omit<ComponentProps<typeof Calendar>, "onClickDay" | "tileClassName" | "formatDay" > {
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}
const CalendarInputComponent = ({ dataSetter,...restProps }: Props) => {
  const [clickedDay, setClickedDay] = useState<string>();
  const limitDay = useMemo(() => {
    if (!meetingCandidateDates?.length) return undefined;
    const dates = meetingCandidateDates.map((v) => startOfDay(new Date(v)));
    return min(dates); // Date 객체 반환
  }, [meetingCandidateDates]);

  useEffect(() => {
    (dataSetter as React.Dispatch<React.SetStateAction<string>>)((prev) => {
      if (!prev) {
        // 초기값인 경우
        return clickedDay;
      } else if (prev.includes("T")) {
        // 날짜+시간이 이미 입력된 경우
        return `${clickedDay}T${prev?.split("T")[1]}`;
      } else if (prev.includes("-")) {
        // 날짜만 입력된 경우
        return clickedDay;
      } else {
        // 시간만 입력된 경우
        return `${clickedDay}T${prev}`;
      }
    });
  }, [clickedDay]);

  return (
    <div className="calendarInputComponent">
      <Calendar
        formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
        onClickDay={(value) => {
          setClickedDay(dateFormatter(value));
        }}
        tileClassName={({ date, view }) => {
          if (clickedDay === dateFormatter(date)) {
            return "custom-active";
          }
        }}
        {...restProps}
        tileDisabled={({ date, view }) => view === "month" && startOfDay(date) >= limitDay}
      />
    </div>
  );
};

export default CalendarInputComponent;
