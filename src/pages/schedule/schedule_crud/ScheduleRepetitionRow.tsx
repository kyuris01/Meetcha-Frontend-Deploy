import styles from "./ScheduleRepetitionRow.module.scss";
import { options } from "./constants/ScheduleRepetitionRow.constants";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";

const ScheduleRepetitionRow = () => {
  const form = useScheduleCreateFormContext();

  return (
    <div className={styles.scheduleRepetitionRow}>
      {options.map((item) => (
        <div
          key={item.id}
          onClick={() => form.setFormValue("recurrence", item.value)}
          className={
            form.getFormValue("recurrence") === item.value
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
