import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateAvailability, submitAvailability } from "@/apis/participate/participateAPI";
import type { SubmitAvailabilityBody } from "@/apis/participate/participateTypes";

export const useHandleSubmitData = (
  meetingId: string,
  pageNum: string,
  finalPostData: SubmitAvailabilityBody
) => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    if (!meetingId) {
      alert("유효하지 않은 미팅입니다.");
      return;
    }
    if (!finalPostData?.selectedTimes?.length) {
      alert("참여 가능 시간을 최소 1개 이상 선택해주세요.");
      return;
    }

    const isModify = pageNum === "3";

    try {
      if (isModify) {
        await updateAvailability(meetingId, {
          selectedTimes: finalPostData.selectedTimes,
        });
      } else {
        await submitAvailability(meetingId, finalPostData);
      }

      if (isModify) {
        alert("수정이 완료되었습니다!");
        navigate("/meeting/detail", { state: { meetingId } });
      } else {
        navigate("/schedule");
      }
    } catch (e) {
      console.error(e);
      alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [meetingId, pageNum, finalPostData, navigate]);

  return handleSubmit;
};
