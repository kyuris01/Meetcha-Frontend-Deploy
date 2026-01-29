import { motion } from "framer-motion";
import "./CommonContent.scss";

import meetingPage from "@assets/meetingCreate.svg";
import participatePage from "@assets/participate.svg";
import meetingListPage from "@assets/meetingLists.svg";
import memoirPage from "@assets/memoir.svg";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CommonContent = () => {
  return (
    <motion.div
      className="content_ctn"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="content-" variants={item}>
        <div className="content_text">
          <p>미팅 생성과 공유</p>
          <div className="content_desc">
            <p>미팅을 간단하게</p>
            <p>생성하고 공유하세요</p>
          </div>
        </div>
        <div className="img_ctn">
          <motion.img src={meetingPage} alt="meetingPage" />
          <motion.span className="line" />
          <motion.span className="circle" />
          <motion.img src={participatePage} alt="participatePage" />
        </div>
      </motion.div>
      <motion.div className="content" variants={item}>
        <div className="content_text">
          <p>미팅 관리</p>
          <div className="content_desc">
            <p>나의 미팅 목록을 통해</p>
            <p> 미팅을 관리해요</p>
          </div>
        </div>
        <img src={meetingListPage} alt="meetingListPage"></img>
      </motion.div>
      <motion.div className="content" variants={item}>
        <div className="content_text">
          <p>미팅 회고</p>
          <div className="content_desc">
            <p>느낀 점을 작성하고</p>
            <p>미팅을 회고해보세요</p>
          </div>
        </div>
        <img src={memoirPage} alt="memoirPage"></img>
      </motion.div>
    </motion.div>
  );
};

export default CommonContent;
