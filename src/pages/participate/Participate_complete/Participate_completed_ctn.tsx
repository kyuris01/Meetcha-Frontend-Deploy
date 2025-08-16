import React from "react";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";

import "./Participate_completed_ctn.scss";
import LeftChevron from "@/assets/LeftChevron.svg";

import completed from "@assets/meeting_complete.svg";
import { useNavigate } from "react-router-dom";
const Participate_completed_ctn = () => {
  const button_text = "링크 다시 입력하기";
  const navigate = useNavigate();
  const backtoLink = () => {
    navigate("/link");
  };
  return (
    <div className="partici_completed_ctn">
      <div className="top_ctn">
        <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink}></img>
        <p>미팅 참가</p>
      </div>
      <div className="partici_main_ctn">
        <img src={completed} alt="warning"></img>
        <div className="text_ctn">
          <p>이미 참여가 마감됐어요</p>
        </div>
      </div>
      <div className="button_ctn">
        <button className="button">
          <div onClick={backtoLink} className="button_p_ctn">
            <p>{button_text}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Participate_completed_ctn;
