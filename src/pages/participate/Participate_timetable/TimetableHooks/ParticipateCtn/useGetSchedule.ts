//구글 캘린더로부터 내 일정 데이터들을 불러옴
import { useEffect } from "react";
import type { MeetingInfoData } from "@/apis/participate/participateTypes";

import { getUserScheduleData } from "@/apis/participate/participateAPI";

export const useGetScheduleData = (meetingData: MeetingInfoData, setScheduleData) => {
  useEffect(() => {
    if (!meetingData) return;
    //순서를 정한거임.. 미팅데이터를 먼저 불러와야함(candidate때문)

    const getSchedule = async () => {
      try {
        const sortedDates = [...meetingData.candidateDates].sort(); //해당 구간 사이의 데이터만 불러오기위함
        const first = sortedDates[0];
        const last = sortedDates[sortedDates.length - 1];
        const scheduleData = await getUserScheduleData(first, last);
        setScheduleData(scheduleData);
      } catch (e) {
        console.error(e);
      }
    };
    getSchedule();
  }, [meetingData]);
};
