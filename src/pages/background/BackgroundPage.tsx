import BottomNav from "@/components/BottomNav";
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
        return <HomePage />;
      case 1:
        return <SchedulePage />;
    }
  };

  return (
    <div className={styles.background_page}>
      <Header />
      {activeMenu()}
      <BottomNav activeMenuNum={activeMenuNum} setActiveMenuNum={setActiveMenuNum} />
    </div>
  );
};

export default BackgroundPage;
