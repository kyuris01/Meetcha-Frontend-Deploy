import React from "react";

import "./TopBanner.scss";

import LeftChevron from "@/assets/LeftChevron.svg";

const TopBanner = ({ text }) => {
  return (
    <div className="top_ctn">
      <img src={LeftChevron} alt="LeftChevron"></img>
      <p>{text}</p>
    </div>
  );
};

export default TopBanner;
