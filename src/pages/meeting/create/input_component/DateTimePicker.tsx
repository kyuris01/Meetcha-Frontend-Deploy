import Calendar from "react-calendar";
import { useMeetingCreateFormContext } from "../hooks/useMeetingCreateForm";
import dayjs from "dayjs";
import min from "dayjs/plugin/minMax";
import "./DateTimePicker.scss";
import { useState } from "react";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@ncdai/react-wheel-picker";
import { isPreviousDate } from "@/utils/MeetingOptionCardUtils";

dayjs.extend(min);
interface TimeOption {
  meridiem: string;
  hour: string;
  minute: string;
}

const formatDate = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const formatTime = (time: TimeOption) => {
  const hour = Number(time.hour) + (time.meridiem === "오후" ? 12 : 0);
  return `${hour}:${time.minute}`;
};

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString().padStart(2, "0"),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: "오전", value: "오전" },
  { label: "오후", value: "오후" },
];

export const DateTimePicker = () => {
  const form = useMeetingCreateFormContext();
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<TimeOption>({
    meridiem: "오전",
    hour: "12",
    minute: "00",
  });

  const timeSetter = (time: TimeOption) => {
    setTime(time);
    if (day) {
      form.setFormValue("deadline", `${formatDate(day)}T${formatTime(time)}`);
    }
  };

  return (
    <>
      <div className="calendarInputComponent">
        <Calendar
          formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
          onClickDay={(date: Date) => {
            setDay(date);
            form.setFormValue("deadline", `${formatDate(date)}T${formatTime(time)}`);
          }}
          tileClassName={({ date }) => {
            if (day === date) {
              return "custom-active";
            }
          }}
          tileDisabled={({ date }) => {
            const candidateDates = form.getFormValue("candidateDates");
            const minDate =
              candidateDates.length > 0 ? dayjs.min(candidateDates.map((d) => dayjs(d))) : null;

            return (
              isPreviousDate(date) ||
              (minDate && dayjs(date).isAfter(minDate, "day")) ||
              candidateDates.includes(formatDate(date))
            );
          }}
        />
      </div>
      <WheelPickerWrapper>
        <WheelPicker
          options={meridiemOptions}
          value={time.meridiem}
          onValueChange={(value) => {
            timeSetter({ ...time, meridiem: value });
          }}
        />
        <WheelPicker
          options={hourOptions}
          infinite
          value={time.hour}
          onValueChange={(value) => {
            timeSetter({ ...time, hour: value });
          }}
        />
        <WheelPicker
          options={minuteOptions}
          infinite
          value={time.minute}
          onValueChange={(value) => {
            timeSetter({ ...time, minute: value });
          }}
        />
      </WheelPickerWrapper>
    </>
  );
};
