import BottomNav from "@/components/BottomNav/BottomNav";
import React, { useEffect, useState } from "react";
import styles from "./BackgroundPage.module.scss";
import Header from "@/components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const pathMapObject = {
  0: "/schedule",
  1: "/meeting",
  2: "/memoir",
  3: "/mypage",
};

const BackgroundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenuNum, setActiveMenuNum] = useState<number>(0);

  // URL에 따라 현재 활성 메뉴를 결정
  React.useMemo(() => {
    if (location.pathname.startsWith("/")) setActiveMenuNum(0);
    if (location.pathname.startsWith("/schedule")) setActiveMenuNum(0);
    if (location.pathname.startsWith("/meeting")) setActiveMenuNum(1);
    if (location.pathname.startsWith("/memoir")) setActiveMenuNum(2);
    if (location.pathname.startsWith("/mypage")) setActiveMenuNum(3);
  }, [location.pathname]);

  useEffect(() => {
    navigate(pathMapObject[activeMenuNum]);
  }, [activeMenuNum]);

  return (
    <div className={styles.background_page}>
      <Header prevButton={false} />
      <Outlet />
      <BottomNav activeMenuNum={activeMenuNum} setActiveMenuNum={setActiveMenuNum} />
    </div>
  );
};

export default BackgroundPage;
