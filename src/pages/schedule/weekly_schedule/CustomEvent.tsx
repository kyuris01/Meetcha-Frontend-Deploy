import styles from "./CustomEvent.module.scss";

export const CustomEvent = ({ event }: any) => {
  return <div className={styles.customEvent}>{event.title}</div>;
};
