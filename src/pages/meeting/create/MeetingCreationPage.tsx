import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";
import { useState } from "react";
import { createMeeting } from "@/apis/meeting/meetingAPI";
import { useNavigate } from "react-router-dom";

export interface MeetingSendData {
  title: string;
  description: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: string;
  projectId: string;
}

const MeetingCreationPage = () => {
  const [allDataReserved, setAllDataReserved] = useState<boolean>(false);
  const [completeData, setCompleteData] = useState<MeetingSendData>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMeetingHandler = async () => {
    if (isSubmitting) return;

    const keys = Object.keys(completeData);

    for (let i = 0; i < keys.length; i++) {
      if (!completeData[keys[i]]) {
        alert("필수 입력을 완료해주세요.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const result = await createMeeting(completeData);
      const status = result?.code;
      const id = result?.data?.meetingId;

      if ((status === 201 || status === 200) && id) {
        navigate(`/timetable?meetingId=${encodeURIComponent(id)}`);
      } else {
        alert(result?.message ?? "meetingId를 응답에서 찾지 못했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          clickHandler={createMeetingHandler}
        />
      </div>
    </div>
  );
};

export default MeetingCreationPage;
