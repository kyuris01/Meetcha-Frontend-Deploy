import { useMemo } from "react";
import type { ParticipateObject,SubmitAvailabilityBody } from "@/apis/participate/participateTypes";

import { snap30, toDate } from "@/utils/dateUtil";
import { parseISO, isAfter, addMinutes, format, getTime } from "date-fns";

export const useGetFinalData = (
  selectedTimes: ParticipateObject[],
  nickname: string
):SubmitAvailabilityBody => {
  return useMemo(() => {
    const times = selectedTimes
      .map((t: ParticipateObject) => {
        const sRaw = t.startAt;
        const eRaw = t.endAt;

        const s = snap30(toDate(sRaw));
        let e = snap30(toDate(eRaw));

        if (!isAfter(e, s)) {
          e = addMinutes(s, 30); // 0길이/역전 방지
        }

        // 서버 스펙: 'YYYY-MM-DDTHH:mm:ss' (로컬 기준)
        return {
          startAt: format(s, "yyyy-MM-dd'T'HH:mm:ss"),
          endAt: format(e, "yyyy-MM-dd'T'HH:mm:ss"),
        };
      })
      .sort(
        (a, b) => getTime(parseISO(a.startAt)) - getTime(parseISO(b.startAt))
      );

    const nick = nickname.trim();
    return {
      nickname: nick.length > 0 ? nick : undefined,
      selectedTimes: times,
    };
  }, [selectedTimes, nickname]);
};
