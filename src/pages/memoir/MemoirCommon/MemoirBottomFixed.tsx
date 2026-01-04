import React from "react";

import "./MemoirBottomFixed.scss";

const MemoirBottomFixed = ({ isReadyToSubmit }) => {
  return (
    <div className="memoir_botton_fixed">
      <button
        className={isReadyToSubmit ? "memoir_write_btn_ready" : "memoir_write_btn"}
        disabled={!isReadyToSubmit}
      >
        <p>회고 작성하기</p>
      </button>
    </div>
  );
};

export default MemoirBottomFixed;
