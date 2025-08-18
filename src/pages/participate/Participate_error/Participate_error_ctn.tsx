import React from "react";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";
import LeftChevron from "@/assets/LeftChevron.svg";
import "./Participate_error.scss";

import { useNavigate } from "react-router-dom";

import error from "@assets/warning.svg";

const Participate_error_ctn = () => {
  const navigate = useNavigate();

  const button_text = "링크 다시 입력하기";

  const backtoLink = () => {
    navigate("/participate");
  };
  return (
    <div className="partici_error_ctn">
      <div className="top_ctn">
        <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink}></img>
        <p>미팅 참가</p>
      </div>
      <div className="partici_main_ctn">
        <img src={error} alt="warning"></img>
        <div className="text_ctn">
          <p>미팅을 찾을 수 없어요</p>
          <p>다시 한번 링크를 확인해주세요!</p>
        </div>
      </div>
      <div className="button_ctn">
        <button className="button" onClick={backtoLink}>
          <div className="button_p_ctn">
            <p>{button_text}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Participate_error_ctn;
