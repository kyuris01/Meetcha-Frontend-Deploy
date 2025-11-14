//previousAvailTime을 기존 선택값과 병합하는 로직
import { useEffect } from "react";
import { parseISO } from "date-fns";
import { snap30, keyOf } from "@/utils/dateUtil";
import type { ParticipateObject } from "@/apis/participate/participateTypes";

interface PreviousTime {
  startAt: string;
  endAt: string;
}

export const useMergePreviousTimes = (
  previousAvailTime: PreviousTime[] | undefined,
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>
) => {
  useEffect(() => {
    if (!Array.isArray(previousAvailTime) || previousAvailTime.length === 0)
      return;

    setSelectedTimes((prev) => {//현재 선택된 시간들과 새로운 previousAvailTime을 합치는 작업
      const exists = new Set(prev.map((s) => keyOf(s.startAt, s.endAt)));//new Set은 중복제거
      const merged = [...prev];
      let changed = false;

      for (const slot of previousAvailTime) {
        const s = snap30(parseISO(slot.startAt));
        const e = snap30(parseISO(slot.endAt));
        const sISO = s.toISOString();
        const eISO = e.toISOString();
        const key = keyOf(sISO, eISO);//
        if (!exists.has(key)) {
          merged.push({ startAt: sISO, endAt: eISO });
          exists.add(key);
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  }, [previousAvailTime, setSelectedTimes]);
};
