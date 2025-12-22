import { isPreviousDate } from "@/utils/MeetingOptionCardUtils";
import Calendar from "react-calendar";
import { useMeetingCreateFormContext } from "../hooks/useMeetingCreateForm";
import dayjs from "dayjs";
import "./Calendar.scss";

const formatDate = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const MultiSelectCalendar = () => {
  const form = useMeetingCreateFormContext();

  const handleClickDay = (value: Date) => {
    const clickedDay = formatDate(value);
    if (form.getFormValue("candidateDates").includes(clickedDay)) {
      form.setFormValue(
        "candidateDates",
        form.getFormValue("candidateDates").filter((day) => day !== clickedDay)
      );
      return;
    }
    form.setFormValue("candidateDates", [...form.getFormValue("candidateDates"), clickedDay]);
  };

  return (
    <div className="calendarMultipleInputComponent">
      <Calendar
        // 이걸로 formatDate 지울 수 있을듯
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        onClickDay={(date: Date) => {
          handleClickDay(date);
        }}
        tileClassName={({ date }) => {
          if (form.getFormValue("candidateDates").includes(formatDate(date))) {
            return "custom-active";
          }
        }}
        tileDisabled={({ date, view }) => {
          return (
            isPreviousDate(date, view) ||
            (form.getFormValue("candidateDates").length >= 10 &&
              !form.getFormValue("candidateDates").includes(formatDate(date)))
          );
        }}
      />
    </div>
  );
};
