//meetingData와
//이전에 선택했던 데이터를 불러오는 로직
import { useEffect } from "react";

import { getPreviousAvailTime, getUserMeetingData } from "@/apis/participate/participateAPI";

export const useGetSettingData = (
  meetingId: string,
  pageNum: string,
  setMeetingData,
  setPreviousAvailTime
) => {
  useEffect(() => {
    if (!meetingId) return;

    const fetchfunc = async () => {
      try {
        const userMeetingData = await getUserMeetingData(meetingId);
        setMeetingData(userMeetingData);

        if (pageNum === "3") {
          const previousTime = await getPreviousAvailTime(meetingId);
          setPreviousAvailTime(previousTime);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchfunc();
  }, [meetingId, pageNum]); // ← pageNum도 의존성에 추가
};
