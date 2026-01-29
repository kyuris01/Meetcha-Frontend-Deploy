import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import MainLogo from "@assets/MeetchaLogo.svg";
import LeftArrow from "@assets/leftArrow.svg?react";
import Hamburger from "@assets/hamburger2.svg";
import { useRef } from "react";

import clsx from "clsx";

interface Props {
  prevButton?: boolean;
  hamburger?: boolean;
  open?: boolean;
  onToggle?: (next: boolean) => void;
}

const Header = ({ prevButton, hamburger, open, onToggle }: Props) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    onToggle?.(!open);
  };

  return (
    <div
      className={clsx(styles.header, {
        [styles["header__hasHamburger"]]: hamburger,
        [styles["header__noHamburger"]]: !hamburger,
      })}
    >
      {prevButton && (
        <LeftArrow className={styles.header__leftArrow} onClick={() => navigate(-1)} />
      )}
      <img className={styles.header__mainlogo} src={MainLogo} alt="Meetcha 로고 이미지" />

      {hamburger && (
        <div ref={ref} className={styles.header__menuWrap}>
          <img
            className={styles.header__menuWrap__hamburger}
            src={Hamburger}
            alt="Hamburger"
            onClick={toggle}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
