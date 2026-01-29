import { useEffect, useState } from "react";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@ncdai/react-wheel-picker";
import type { Dispatch, SetStateAction } from "react";
import styles from "./TimePicker.module.scss";

export interface TimeOption {
  meridiem: string;
  hour: string;
  minute: string;
}

const formatTime = (time: TimeOption) => {
  return `${time.meridiem} ${time.hour}:${time.minute}`;
};

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i * add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString().padStart(2, "0"),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(12, 5);
const meridiemOptions: WheelPickerOption[] = [
  { label: "오전", value: "오전" },
  { label: "오후", value: "오후" },
];

interface TimePickerProps {
  setStringTime: Dispatch<SetStateAction<string>>;
  stringTime: string;
}

export const TimePicker = ({ setStringTime, stringTime }: TimePickerProps) => {
  const [strMeridiem, strTime] = stringTime.split(" ");
  const [strHour, strMinute] = strTime.split(":");
  const [time, setTime] = useState<TimeOption>({
    meridiem: strMeridiem,
    hour: strHour,
    minute: strMinute,
  });

  useEffect(() => {
    setStringTime(`${formatTime(time)}`);
  }, [time]);

  return (
    <div
      className={`${styles.timePicker} timePicker`}
      onPointerDownCapture={(e) => e.stopPropagation()}
      onClickCapture={(e) => e.stopPropagation()}
    >
      <WheelPickerWrapper>
        <WheelPicker
          options={meridiemOptions}
          value={time.meridiem}
          onValueChange={(value) => {
            setTime({ ...time, meridiem: value });
          }}
        />
        <WheelPicker
          options={hourOptions}
          infinite
          value={time.hour}
          onValueChange={(value) => {
            setTime({ ...time, hour: value });
          }}
        />
        <WheelPicker
          options={minuteOptions}
          infinite
          value={time.minute}
          onValueChange={(value) => {
            setTime({ ...time, minute: value });
          }}
        />
      </WheelPickerWrapper>
    </div>
  );
};
