import styles from "./CustomEvent.module.scss";

export const CustomEvent = ({ event }: any) => {
  console.log(event);

  return <div className={styles.customEvent}>{event.title}</div>;
};
