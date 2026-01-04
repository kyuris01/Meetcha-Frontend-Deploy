import React from "react";
import leftChevron from "@/assets/LeftChevron.svg";
import vertical_hamburger from "@/assets/vertical_hamburger.svg";
import { useNavigate } from "react-router-dom";
import "./MemoirComplete.scss";

const MemoirCompleteIntro = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/memoir");
  };
  return (
    <div className="complete_intro_ctn">
      <img onClick={handleClick} src={leftChevron} alt="leftChevron"></img>
      <p>미팅 회고</p>
      <img src={vertical_hamburger} alt="hamburger"></img>
    </div>
  );
};

export default MemoirCompleteIntro;
