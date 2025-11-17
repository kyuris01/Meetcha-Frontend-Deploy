import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";
import { useState } from "react";
import { createMeeting } from "@/apis/meeting/meetingAPI";
import { useNavigate } from "react-router-dom";
import { MeetingCreateFormContext, useMeetingCreateForm } from "./hooks/useMeetingCreateForm";
import { meetingFormDataConvert } from "./utils/meetingFormDataConvert";
import { meetingCreationSchema } from "./schemas/meetingCreationSchema";

export interface MeetingSendData {
  title: string;
  description: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: string;
  projectId: string;
}

const MeetingCreationPage = () => {
  const form = useMeetingCreateForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: 이거 갈아끼우기
  const handleSubmit = () => {
    form.onSubmit(async () => {
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        const sendData = meetingFormDataConvert(form.values);
        const result = await createMeeting(sendData);
        const status = result?.code;
        const id = result?.data?.meetingId;

        if ((status === 201 || status === 200) && id) {
          navigate(`/meeting/share/${id}`);
        } else {
          alert(result?.message ?? "meetingId를 응답에서 찾지 못했습니다.");
        }
      } catch (e) {
        console.error(e);
        alert("서버 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className={styles.meetingCreationPage}>
      <TopNav type="text" label="미팅 생성" />
      <MeetingCreateFormContext.Provider value={form}>
        <div className={styles.meetingCreationPage__contents}>
          <MeetingCreationView />
          <Button
            className={
              meetingCreationSchema.safeParse(form.values).success ? styles.active : styles.inactive
            }
            label={"미팅 생성하기"}
            clickHandler={handleSubmit}
          />
        </div>
      </MeetingCreateFormContext.Provider>
    </div>
  );
};

export default MeetingCreationPage;
