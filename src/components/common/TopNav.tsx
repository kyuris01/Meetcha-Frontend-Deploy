import styles from "./TopNav.module.scss";
import MainLogo from "@assets/MeetchaLogo.svg";
import LeftArrow from "@assets/leftArrow.svg?react";
import { useNavigate } from "react-router-dom";

interface Props {
  type?: string;
  label?: string;
  className?: string;
}

const TopNav = ({ type, label, className }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.topnav} ${className}`}>
      <div className={styles.topnav__left}>
        <LeftArrow className={styles.topnav__left__icon} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.topnav__center}>
        {type === "logo" ? (
          <img src={MainLogo} alt="메인 로고" />
        ) : (
          <div className={styles.topnav__center__label}>{label}</div>
        )}
      </div>

      <div className={styles.topnav__right}></div>
    </div>
  );
};

export default TopNav;
