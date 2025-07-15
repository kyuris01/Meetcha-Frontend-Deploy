import styles from "./BottomNav.module.scss";
import Hamburger from "@assets/hamburger.svg?react";
import Calendar from "@assets/calendar.svg?react";
import { useState } from "react";

interface Props {
  activeMenuNum: number;
  setActiveMenuNum: React.Dispatch<React.SetStateAction<number>>;
}

const BottomNav = ({ activeMenuNum, setActiveMenuNum }: Props) => {
  const dataSet = [
    { id: 0, label: "홈", img: <Hamburger /> },
    { id: 1, label: "내 일정", img: <Calendar /> },
  ];

  return (
    <div className={styles.bottom_nav}>
      {dataSet.map((item, index) => (
        <div
          className={
            activeMenuNum === item.id
              ? `${styles.bottom_nav__icon} ${styles.active}`
              : styles.bottom_nav__icon
          }
          key={index}
          onClick={() => setActiveMenuNum(item.id)}
        >
          {item.img}
          <div className={styles.bottom_nav__icon__label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
