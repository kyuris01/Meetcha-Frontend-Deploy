import { useEffect, useState } from "react";
import ScheduleDurationRow from "./ScheduleDurationRow";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";
import { TimePicker } from "./components/TimePicker";
import Clock from "@assets/clock.svg?react";
import styles from "./ScheduleCrudCard.module.scss";

interface Props {
  clickedSpan: string; // 주간캘린더에서 선택한 일정 범위
}

export const Picker = {
  Start: "start",
  End: "end",
} as const;

export type PickerType = (typeof Picker)[keyof typeof Picker];

const ScheduleCrudCardExpandable = ({ clickedSpan }: Props) => {
  // clickedSpan : YYYY년 MM월 DD일(D) HH시 MM분
  const [
    initStartYear,
    initStartMonth,
    initStartDate,
    initStartMeridiem,
    initStartTime,
    initEndYear,
    initEndMonth,
    initEndDate,
    initEndMeridiem,
    initEndTime,
  ] = clickedSpan.split(" ");
  const startYear = initStartYear.substring(0, 4); // YYYY
  const startMonth = initStartMonth.substring(0, 2); // MM
  const startDate = initStartDate.substring(0, 2); // DD
  const endYear = initEndYear.substring(0, 4);
  const endMonth = initEndMonth.substring(0, 2);
  const endDate = initEndDate.substring(0, 2);

  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [pickerType, setPickerType] = useState<PickerType>(Picker.Start);
  const [startTime, setStartTime] = useState<string>(`${initStartMeridiem} ${initStartTime}`);
  const [endTime, setEndTime] = useState<string>(`${initEndMeridiem} ${initEndTime}`);
  const { setFormValue } = useScheduleCreateFormContext();

  useEffect(() => {
    setFormValue(
      "startAt",
      startYear + "-" + startMonth + "-" + startDate + "T" + formatTime(startTime)
    );
    setFormValue("endAt", endYear + "-" + endMonth + "-" + endDate + "T" + formatTime(endTime));
  }, [
    startTime,
    endTime,
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate,
    setFormValue,
  ]);

  const formatTime = (time: string) => {
    const [meridiem, timeAndMinute] = time.split(" ");
    const [hour, minute] = timeAndMinute.split(":");
    const base24Hour = Number(hour) + (meridiem === "오후" ? 12 : 0);
    const formattedHour = String(base24Hour).padStart(2, "0");
    return `${formattedHour}:${minute}`;
  };

  return (
    <div
      onClick={() => {
        setIsCardOpen((prev) => !prev);
      }}
      className={
        isCardOpen ? `${styles.active} ${styles.scheduleCrudCard}` : styles.scheduleCrudCard
      }
    >
      <div className={styles.scheduleCrudCard__basic}>
        <div className={styles.scheduleCrudCard__basic__icon}>
          <Clock />
        </div>
        <div className={styles.scheduleCrudCard__basic__data}>
          <ScheduleDurationRow
            pickerType={pickerType}
            setPickerType={setPickerType}
            startTime={startTime}
            endTime={endTime}
            clickedSpan={clickedSpan}
          />
        </div>
      </div>
      {isCardOpen && (
        <div className={styles.scheduleCrudCard__expanded}>
          {pickerType === Picker.Start ? (
            <TimePicker setStringTime={setStartTime} stringTime={startTime} />
          ) : (
            <TimePicker setStringTime={setEndTime} stringTime={endTime} />
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCrudCardExpandable;
