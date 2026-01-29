import styles from "./Button.module.scss";

interface Props {
  className?: string;
  label: string;
  clickHandler?: () => void;
}

const Button = ({ className, label, clickHandler }: Props) => {
  return (
    <div className={`${styles.button} ${className}`} onClick={clickHandler}>
      <div className={styles.button__label}>{label}</div>
    </div>
  );
};

export default Button;
