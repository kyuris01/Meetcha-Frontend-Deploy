import styles from "./CustomWeekHeader.module.scss";

const CustomWeekHeader = ({ label }: any) => {
  return (
    <div className={styles.customWeekHeader}>
      <div className={styles.customWeekHeader__date}>{label.substr(0, 2)}</div>
      <div className={styles.customWeekHeader__day}>{label.substr(2)}</div>
    </div>
  );
};

export default CustomWeekHeader;
