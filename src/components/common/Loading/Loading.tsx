import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>;
    </div>
  );
}

export default Loading;
