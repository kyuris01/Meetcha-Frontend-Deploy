import React from "react";
import styles from "./ScheduleRepetitionRow.module.scss";
import { options } from "./constants/ScheduleRepetitionRow.constants";

interface Props {
  data: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
  sharingData?: string;
}

const ScheduleRepetitionRow = ({ data, dataSetter }: Props) => {
  return (
    <div className={styles.scheduleRepetitionRow}>
      {options.map((item, _) => (
        <div
          key={item.id}
          onClick={() => dataSetter(item.value)}
          className={
            data === item.label
              ? `${styles.active} ${styles.scheduleRepetitionRow__item}`
              : styles.scheduleRepetitionRow__item
          }
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ScheduleRepetitionRow;
