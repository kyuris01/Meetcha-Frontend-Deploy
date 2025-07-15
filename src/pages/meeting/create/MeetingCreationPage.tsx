import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";
import { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

export interface MeetingData {
  title: string;
  explanation: string;
  candidateDate: string[];
  proceedTime: string;
  expirationTime: string;
}

const MeetingCreationPage = () => {
  const [allDataReserved, setAllDataReserved] = useState<boolean>(false);
  const [completeData, setCompleteData] = useState<MeetingData>();

  // ✅ Hook을 컴포넌트 최상위에서 호출
  const { response, loading, error, fire } = useAPIs(
    "/meeting_create",
    "POST",
    completeData,
    false,
    true // manual = true로 설정
  );

  // ✅ 이벤트 핸들러에서는 fire 함수만 호출
  const sendCreationReq = () => {
    if (completeData) {
      fire(); // API 호출 트리거
    }
  };

  // ✅ response 변화를 감지하여 결과 처리
  useEffect(() => {
    if (response) {
      if (response.code === 20000) {
        alert("생성완료 되었습니다!");
      } else {
        alert("생성실패");
      }
    }
  }, [response]);

  return (
    <div className={styles.meetingCreationPage}>
      <TopNav type="text" label="미팅 생성" />
      <div className={styles.meetingCreationPage__contents}>
        <MeetingCreationView
          setAllDataReserved={setAllDataReserved}
          setCompleteData={setCompleteData}
        />
        <Button
          className={allDataReserved ? styles.active : styles.inactive}
          label={"미팅 생성하기"}
          clickHandler={sendCreationReq}
        />
      </div>
    </div>
  );
};

export default MeetingCreationPage;
