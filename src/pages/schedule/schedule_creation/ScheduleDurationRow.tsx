import React, { useEffect, useState } from "react";
import styles from "./ScheduleDurationRow.module.scss";
import RightChevron from "@assets/rightChevron.svg?react";

interface Props {
  clickedSpan: string;
  sharingData: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleDurationRow = ({ clickedSpan, sharingData, dataSetter }: Props) => {
  // ex) clickedSpan : 07월 31일(목) 오전 02:00 07월 31일(목) 오전 05:30
  const parts = clickedSpan.split(" ");

  const [startOrEnd, setStartOrEnd] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    setStartTime(`${parts[2]} ${parts[3]}`);
    setEndTime(`${parts[6]} ${parts[7]}`);
  }, [clickedSpan]);

  useEffect(() => {
    if (sharingData == null || sharingData === "") return;
    if (startOrEnd === 1) {
      setStartTime(sharingData);
    } else if (startOrEnd === 2) {
      setEndTime(sharingData);
    }
  }, [sharingData, startOrEnd]);

  useEffect(() => {
    dataSetter(`${parts[0]} ${parts[1]} ${startTime} ${parts[4]} ${parts[5]} ${endTime}`);
  }, [startTime, endTime]);

  return (
    <div className={styles.scheduleDurationRow}>
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setStartOrEnd(1);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {parts[0]} {parts[1]}
        </div>
        <div
          className={
            startOrEnd === 1
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
          setStartOrEnd(2);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {parts[4]} {parts[5]}
        </div>
        <div
          className={
            startOrEnd === 2
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
