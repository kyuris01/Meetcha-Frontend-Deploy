import React from "react";
import styles from "./ScheduleRepetitionRow.module.scss";

interface Props {
  data: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
  sharingData?: string;
}

const ScheduleRepetitionRow = ({ data, dataSetter }: Props) => {
  const options = [
    { id: 0, label: "없음" },
    {
      id: 1,
      label: "매일",
    },
    {
      id: 2,
      label: "매주",
    },
    {
      id: 3,
      label: "격주",
    },
    {
      id: 4,
      label: "매달",
    },
  ];
  return (
    <div className={styles.scheduleRepetitionRow}>
      {options.map((item, _) => (
        <div
          key={item.id}
          onClick={() => dataSetter(item.label)}
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
