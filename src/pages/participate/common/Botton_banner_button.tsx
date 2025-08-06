import React from "react";

import "./Bottom_banner_button.scss";

const Botton_banner_button = ({ text }) => {
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

export default Botton_banner_button;
