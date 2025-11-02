import React from "react";
import styles from "./ScheduleDurationRow.module.scss";
import RightChevron from "@assets/rightChevron.svg?react";
import { Picker, type PickerType } from "./ScheduleCrudCardExpandable";

interface Props {
  clickedSpan: string;
  startTime: string;
  endTime: string;
  pickerType: PickerType;
  setPickerType: React.Dispatch<React.SetStateAction<PickerType>>;
}

const ScheduleDurationRow = ({
  clickedSpan,
  startTime,
  endTime,
  pickerType,
  setPickerType,
}: Props) => {
  // ex) clickedSpan : YYYY년 MM월 DD일(D) HH시 MM분 YYYY년 MM월 DD일(D) HH시 MM분
  const [, initStartMonth, initStartDate, , , , initEndMonth, initEndDate, ,] =
    clickedSpan.split(" ");

  return (
    <div className={styles.scheduleDurationRow}>
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setPickerType(Picker.Start);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initStartMonth} {initStartDate}
        </div>
        <div
          className={
            pickerType === Picker.Start
              ? `${styles.active} ${styles.scheduleDurationRow__box__time}`
              : styles.scheduleDurationRow__box__time
          }
        >
          {startTime}
        </div>
      </div>
      <RightChevron />
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setPickerType(Picker.End);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initEndMonth} {initEndDate}
        </div>
        <div
          className={
            pickerType === Picker.End
              ? `${styles.active} ${styles.scheduleDurationRow__box__time}`
              : styles.scheduleDurationRow__box__time
          }
        >
          {endTime}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDurationRow;
