import BottomNav from "@/components/BottomNav/BottomNav";
import React, { useState } from "react";
import styles from "./BackgroundPage.module.scss";
import HomePage from "../home/HomePage";
import SchedulePage from "../schedule/SchedulePage";
import Header from "@/components/Header";

const BackgroundPage = () => {
  const [activeMenuNum, setActiveMenuNum] = useState<number>(0);
  const activeMenu = () => {
    switch (activeMenuNum) {
      case 0:
        return <SchedulePage />;
      case 1:
        return <HomePage />;
    }
  };

  return (
    <div className={styles.background_page}>
      <Header prevButton={false} />
      {activeMenu()}
      <BottomNav activeMenuNum={activeMenuNum} setActiveMenuNum={setActiveMenuNum} />
    </div>
  );
};

export default BackgroundPage;
