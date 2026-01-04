import React from "react";

import "./BottomBannerButton.scss";

const BottonBannerButton = ({ text }) => {
  return (
    <div className="button_ctn">
      <button className="button">
        <div className="button_p_ctn">
          <p>{text}</p>
        </div>
      </button>
    </div>
  );
};

export default BottonBannerButton;
