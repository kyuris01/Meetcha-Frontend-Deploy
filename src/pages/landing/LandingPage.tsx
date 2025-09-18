import React from "react";
import meetchaLogo from "@assets/MeetchaLogo.svg";
import calendar from "@assets/realCalendar.svg";
import { motion,type Variants } from "framer-motion";
import "./LadingPage.scss";

import CommonContent from "./CommonContent";

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPage = () => {
  return (
    <motion.div className="landingPage_ctn" initial="hidden" whileInView="show" viewport={{once:true,amount:0.2}}>
      <motion.div className="Header" variants={fadeUp}>
        <img src={meetchaLogo} alt="MeetchaLogo"></img>
        <p>모임의 시작은 MeetCha에서</p>
      </motion.div>
      <motion.div className="main_desc" variants={fadeUp}>
        <p>
          <span style={{ color: "#FF6200" }}>구글 캘린더</span>와 연동된 시작
        </p>
        <img src={calendar} alt="calendar"></img>
      </motion.div>
      <CommonContent />
      <motion.div className="closing_ment" variants={fadeUp}>
        <p>
          팀원과 일정을 공유하고
          <br />
          회의 시간을 편리하게 정해보세요!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
