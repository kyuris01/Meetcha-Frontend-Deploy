import React from "react";
import styles from "./ScheduleCrudCard.module.scss";
import type { ScheduleCreationSchema } from "./schemas/scheduleCreationSchema";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";

interface Props {
  icon: React.ReactNode;
  content: React.ReactNode;
  type: keyof ScheduleCreationSchema;
}

const ScheduleCrudCard = ({ icon, content, type }: Props) => {
  const form = useScheduleCreateFormContext();

  return (
    <div
      className={
        form.getFormValue(type) !== "NONE"
          ? `${styles.active} ${styles.scheduleCrudCard}`
          : styles.scheduleCrudCard
      }
    >
      <div className={styles.scheduleCrudCard__basic}>
        <div className={styles.scheduleCrudCard__basic__icon}>{icon}</div>
        <div className={styles.scheduleCrudCard__basic__data}>{content}</div>
      </div>
    </div>
  );
};

export default ScheduleCrudCard;
