import { durationOptions } from "../constants/MeetingCreation.constants";
import { useMeetingCreateFormContext } from "../hooks/useMeetingCreateForm";
import styles from "./DurationSelect.module.scss";
export const DurationSelect = () => {
  const form = useMeetingCreateFormContext();
  return (
    <div className={styles.durationSelect}>
      {durationOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            form.setFormValue("durationMinutes", option.value);
          }}
          className={
            form.getFormValue("durationMinutes") === option.value ? styles.selected : undefined
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
