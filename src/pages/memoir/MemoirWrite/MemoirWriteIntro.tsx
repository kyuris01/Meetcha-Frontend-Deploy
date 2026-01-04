import React from "react";
import leftchevron from "@/assets/LeftChevron.svg";
import { useNavigate } from "react-router-dom";

import "./MemoirWrite.scss";

const MemoirWriteIntro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/memoir");
  };
  return (
    <div className="memoir_write_intro_container">
      <button onClick={handleClick}>
        <img src={leftchevron} alt="leftchevron"></img>
      </button>
      <p>회고 작성하기</p>
    </div>
  );
};

export default MemoirWriteIntro;
