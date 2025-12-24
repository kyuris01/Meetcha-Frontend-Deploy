import { useEffect } from "react";
import type React from "react";
import type { ParticipateObject } from "@/apis/participate/participateTypes";
import { addMinutes } from "date-fns";
import { snap30, keyOf } from "@/utils/dateUtil"; // ✅

const MIN30 = 30;

function intervalsToKeySet(intervals: ParticipateObject[]): Set<string> {
  const set = new Set<string>();
  for (const it of intervals) {
    let cur = snap30(new Date(it.startAt));
    const until = snap30(new Date(it.endAt));
    while (cur < until) {
      const next = addMinutes(cur, MIN30);
      set.add(keyOf(cur.toISOString(), next.toISOString()));
      cur = next;
    }
  }
  return set;
}

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
    if (s === curEnd) curEnd = e;
    else {
      out.push({ startAt: new Date(curStart).toISOString(), endAt: new Date(curEnd).toISOString() });
      curStart = s;
      curEnd = e;
    }
  }
  out.push({ startAt: new Date(curStart).toISOString(), endAt: new Date(curEnd).toISOString() });
  return out;
}

export const useMergePreviousTimes = (
  previousAvailTime: { startAt: string; endAt: string }[] | undefined,
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>
) => {
  useEffect(() => {
    if (!previousAvailTime?.length) return;

    setSelectedTimes((prev) => {
      const set = intervalsToKeySet(prev);

      // 이전 시간도 슬롯 단위로 추가(합집합)
      for (const it of previousAvailTime) {
        let cur = snap30(new Date(it.startAt));
        const until = snap30(new Date(it.endAt));
        while (cur < until) {
          const next = addMinutes(cur, MIN30);
          set.add(keyOf(cur.toISOString(), next.toISOString()));
          cur = next;
        }
      }

      return keysToIntervals(set);
    });
  }, [previousAvailTime, setSelectedTimes]);
};

