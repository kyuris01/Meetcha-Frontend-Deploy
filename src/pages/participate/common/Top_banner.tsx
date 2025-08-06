import React from "react";

import "./Top_banner.scss";

import LeftChevron from '@/assets/LeftChevron.svg';

const Top_banner = ({text}) => {
  return (<div className="top_ctn">
    <img src={LeftChevron} alt="LeftChevron"></img>
    <p>{text}</p>
  </div>);
};

export default Top_banner;
