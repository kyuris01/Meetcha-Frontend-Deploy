import Calendar from "react-calendar";
import { format, min as dateMin, isAfter, startOfDay } from "date-fns";
import "./Calendar.scss";
import { useState } from "react";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@ncdai/react-wheel-picker";
import { isPreviousDate } from "@/utils/MeetingOptionCardUtils";
import { useMeetingCreateFormContext } from "@/hooks/meeting/create/useMeetingCreateForm";
interface TimeOption {
  meridiem: string;
  hour: string;
  minute: string;
}

const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

const formatTime = (time: TimeOption) => {
  const numHour = Number(time.hour) % 12;
  const hour = numHour + (time.meridiem === "오후" ? 12 : 0);
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
    <div className="dateTimePicker">
      <div className="calendarInputComponent">
        <Calendar
          formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
          onClickDay={(date: Date) => {
            setDay(date);
            form.setFormValue("deadline", `${formatDate(date)}T${formatTime(time)}`);
          }}
          tileClassName={({ date }) => {
            if (day?.getTime() === date.getTime()) {
              return "custom-active";
            }
          }}
          tileDisabled={({ date, view }) => {
            const candidateDates = form.getFormValue("candidateDates");
            const minDate =
              candidateDates.length > 0 ? dateMin(candidateDates.map((d) => new Date(d))) : null;

            return (
              isPreviousDate(date, view) ||
              (minDate && isAfter(startOfDay(date), startOfDay(minDate))) ||
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
    </div>
  );
};
