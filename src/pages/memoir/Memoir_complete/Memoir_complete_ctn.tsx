import React from "react";
import { useLocation } from "react-router-dom";

import Memoir_complete_intro from "./Memoir_complete_intro";
import Memoir_complete_main from "./Memoir_complete_main";
import type { MemoirDetail } from "@/apis/memoir/memoirTypes";
const Memoir_complete_ctn = () => {
  const location = useLocation();
  const meeting:MemoirDetail = location.state; //이 state에는 meeting하나에 대한 모든 정보가 들어 있다.


  return (
    <div className="memoir_complete_ctn">
      <Memoir_complete_intro />
      <Memoir_complete_main meeting={meeting} />
    </div>
  );
};

export default Memoir_complete_ctn;
