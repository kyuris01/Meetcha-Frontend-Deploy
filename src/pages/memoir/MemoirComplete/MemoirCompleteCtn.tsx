import { useLocation } from "react-router-dom";

import MemoirCompleteIntro from "../../../components/domain/memoir/MemoirComplete/MemoirCompleteIntro";
import MemoirCompleteMain from "../../../components/domain/memoir/MemoirComplete/MemoirCompleteMain";
import type { MemoirDetail } from "@/apis/memoir/memoirTypes";
const MemoirCompleteCtn = () => {
  const location = useLocation();
  const meeting: MemoirDetail = location.state; //이 state에는 meeting하나에 대한 모든 정보가 들어 있다.

  return (
    <div className="memoir_complete_ctn">
      <MemoirCompleteIntro />
      <MemoirCompleteMain meeting={meeting} />
    </div>
  );
};

export default MemoirCompleteCtn;
