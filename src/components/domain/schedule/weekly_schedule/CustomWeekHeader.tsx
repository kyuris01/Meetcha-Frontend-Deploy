import styles from "./CustomWeekHeader.module.scss";

type Props = {
  label: string;
};

const CustomWeekHeader = ({ label }: Props) => {
  return (
    <div className={styles.customWeekHeader}>
      <div
        className={
          label.substr(3) === "Sun"
            ? `${styles.customWeekHeader__date} ${styles.sunday}`
            : styles.customWeekHeader__date
        }
      >
        {label.substring(3, 4)}
      </div>
      <div className={styles.customWeekHeader__day}>{label.substr(0, 2)}</div>
    </div>
  );
};

export default CustomWeekHeader;
