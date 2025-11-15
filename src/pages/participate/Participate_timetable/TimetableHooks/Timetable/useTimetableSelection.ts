//handleSelect함수 따로 뺌ㅋ
import { addMinutes, isAfter } from "date-fns";
import { snap30, keyOf } from "@/utils/dateUtil";
import type { ParticipateObject } from "@/apis/participate/participateTypes";
import type React from "react";

interface date {
  start: Date;
  end: Date;
}
export const useTimetableSelection = (
  selectedTimes: ParticipateObject[],
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>
) => {
  const handleSelect = (info: date) => {
    const s = snap30(info.start as Date);
    let e = snap30(info.end as Date);

    if (!isAfter(e, s)) e = addMinutes(s, 30);

    const sISO = s.toISOString();
    const eISO = e.toISOString();
    const key = keyOf(sISO, eISO);

    const exists = selectedTimes.some((t) => keyOf(t.startAt, t.endAt) === key); //중복 클릭이 존재하는지 체크하는 로직->선택된 시간 배열 안에 이미 선택한 시간이

    setSelectedTimes((prev) =>
      exists
        ? prev.filter((t) => keyOf(t.startAt, t.endAt) !== key)
        : [...prev, { startAt: sISO, endAt: eISO }]
    );
  };

  return { handleSelect };
};
