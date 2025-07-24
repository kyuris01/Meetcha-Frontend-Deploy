import styles from "./BottomNav.module.scss";
import Hamburger from "@assets/hamburger.svg?react";
import Calendar from "@assets/calendar.svg?react";
import SpinningClock from "@assets/spinningClock.svg?react";
import Human from "@assets/human.svg?react";
import { PiPlusCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavModal from "./NavModal";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";

interface Props {
  activeMenuNum: number;
  setActiveMenuNum: React.Dispatch<React.SetStateAction<number>>;
}

const BottomNav = ({ activeMenuNum, setActiveMenuNum }: Props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);

  const leftDataSet = [
    { id: 0, label: "내 일정", img: <Calendar /> },
    { id: 1, label: "미팅 목록", img: <Hamburger /> },
  ];

  const rightDataSet = [
    { id: 2, label: "회고", img: <SpinningClock /> },
    { id: 3, label: "마이", img: <Human /> },
  ];

  const clickHandler = () => {
    setModal((prev) => !prev);
  };

  const portal = ReactDOM.createPortal(
    <AnimatePresence>
      {modal && (
        <motion.div className={styles.backdrop} onClick={() => setModal(false)}>
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NavModal />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div className={styles.bottomNav}>
      <div className={styles.bottomNav__side}>
        {leftDataSet.map((item, index) => (
          <div
            className={
              activeMenuNum === item.id
                ? `${styles.bottomNav__side__icon} ${styles.active}`
                : styles.bottomNav__side__icon
            }
            key={index}
            onClick={() => setActiveMenuNum(item.id)}
          >
            {item.img}
            <div className={styles.bottomNav__side__icon__label}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.bottomNav__center}></div>
      <div className={styles.bottomNav__side}>
        {rightDataSet.map((item, index) => (
          <div
            className={
              activeMenuNum === item.id
                ? `${styles.bottomNav__side__icon} ${styles.active}`
                : styles.bottomNav__side__icon
            }
            key={index}
            onClick={() => setActiveMenuNum(item.id)}
          >
            {item.img}
            <div className={styles.bottomNav__side__icon__label}>{item.label}</div>
          </div>
        ))}
      </div>
      {portal}
      <div className={styles.largeCircle}>
        <PiPlusCircleFill onClick={clickHandler} />
      </div>
    </div>
  );
};

export default BottomNav;
