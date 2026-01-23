import { useEffect, useState } from "react";
import ScheduleDurationRow from "./ScheduleDurationRow";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";
import { TimePicker } from "./components/TimePicker";
import Clock from "@assets/clock.svg?react";
import styles from "./ScheduleCrudCard.module.scss";
import { naturalDateToISO } from "@/utils/dateFormatter";

interface Props {
  clickedSpan: string; // 주간캘린더에서 선택한 일정 범위
}

export const Picker = {
  Start: "start",
  End: "end",
} as const;

export type PickerType = (typeof Picker)[keyof typeof Picker];

const ScheduleCrudCardExpandable = ({ clickedSpan }: Props) => {
  // clickedSpan : 2025년 11월 17일(월) 오전 12:00 2025년 11월 17일(월) 오전 01:30
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
  const form = useScheduleCreateFormContext();

  useEffect(() => {
    form.setFormValue(
      "startAt",
      naturalDateToISO(startYear + "년 " + startMonth + "월 " + startDate + "일 " + startTime)
    );
    form.setFormValue(
      "endAt",
      naturalDateToISO(endYear + "년 " + endMonth + "월 " + endDate + "일 " + endTime)
    );
  }, [startTime, endTime]);

  return (
    <div
      onClick={() => {
        setIsCardOpen((prev) => !prev);
      }}
      className={
        isCardOpen
          ? `${styles.active} ${styles.scheduleCrudCard} ${styles.expandable}`
          : `${styles.scheduleCrudCard} ${styles.expandable}`
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
