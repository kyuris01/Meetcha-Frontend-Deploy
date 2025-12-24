import type React from "react";
import type { ParticipateObject } from "@/apis/participate/participateTypes";
import { addMinutes } from "date-fns";
import { snap30, keyOf } from "@/utils/dateUtil"; // ✅ 네 util 사용 (경로만 맞춰줘)

const MIN30 = 30; // minutes

// 30분 슬롯 단위로 [start,end) 를 펼쳐 "slotKey" Set으로 토글
function toggleRangeKeys(prev: ParticipateObject[], start: Date, end: Date): ParticipateObject[] {
  // 1) 기존 intervals -> slotKey Set
  const set = new Set<string>();
  for (const it of prev) {
    let cur = snap30(new Date(it.startAt));
    const until = snap30(new Date(it.endAt));
    while (cur < until) {
      const next = addMinutes(cur, MIN30);
      set.add(keyOf(cur.toISOString(), next.toISOString()));
      cur = next;
    }
  }

  // 2) 드래그 범위 -> slotKey들 토글
  let cur = snap30(start);
  const until = snap30(end);
  while (cur < until) {
    const next = addMinutes(cur, MIN30);
    const k = keyOf(cur.toISOString(), next.toISOString());
    if (set.has(k)) set.delete(k);
    else set.add(k);
    cur = next;
  }

  // 3) slotKey Set -> 연속 interval로 압축
  return keysToIntervals(set);
}

// slotKey("s|e")들을 정렬해서 연속 구간으로 압축
function keysToIntervals(set: Set<string>): ParticipateObject[] {
  const slots = Array.from(set)
    .map((k) => {
      const [s, e] = k.split("|").map((x) => Number(x));
      return { s, e };
    })
    .sort((a, b) => a.s - b.s);

  if (slots.length === 0) return [];

  const out: ParticipateObject[] = [];
  let curStart = slots[0].s;
  let curEnd = slots[0].e;

  for (let i = 1; i < slots.length; i++) {
    const { s, e } = slots[i];
    if (s === curEnd) {
      // 바로 붙으면 연속
      curEnd = e;
    } else {
      out.push({
        startAt: new Date(curStart).toISOString(),
        endAt: new Date(curEnd).toISOString(),
      });
      curStart = s;
      curEnd = e;
    }
  }
  out.push({ startAt: new Date(curStart).toISOString(), endAt: new Date(curEnd).toISOString() });

  return out;
}

export const useTimetableSelection = (
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>
) => {
  // ✅ 드래그 토글
  const handleSelect = (info) => {
    setSelectedTimes((prev) => toggleRangeKeys(prev, info.start, info.end));
    info.view?.calendar?.unselect?.();
  };

  // ✅ 클릭(한 칸) 토글: dateClick은 클릭한 "시각"이 들어옴
  const handleDateClick = (info) => {
    const start = snap30(info.date);
    const end = addMinutes(start, MIN30);
    setSelectedTimes((prev) => toggleRangeKeys(prev, start, end));
  };

  return { handleSelect, handleDateClick };
};
