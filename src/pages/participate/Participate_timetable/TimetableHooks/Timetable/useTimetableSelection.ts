import type { ParticipateObject } from "@/apis/participate/participateTypes";
import {
  addDays,
  addMinutes,
  differenceInCalendarDays,
  startOfDay,
  subMilliseconds,
} from "date-fns";
import { snap30, keyOf } from "@/utils/dateUtil";
import { useCallback, useRef, useState, type Dispatch, type SetStateAction } from "react";

/**드래그 영역을 분해할 때 분해된 요소의 단위 */
interface Segment {
  id: string;
  start: Date;
  end: Date;
  display: string;
  className: string;
}

const MIN30 = 30; // minutes

// 30분 슬롯 단위로 [start,end] 를 펼쳐 "slotKey" Set으로 토글
export function toggleRangeKeys(
  prev: ParticipateObject[],
  start: Date,
  end: Date
): ParticipateObject[] {
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

/** slotKey("s|e")들을 정렬해서 연속 구간으로 압축 */
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

/** 연속 구간(start~end)을 "날짜별 직사각형" 구간들로 분해하는 메서드 */
export function splitRectSelection(start: Date, end: Date): Array<{ start: Date; end: Date }> {
  // end는 exclusive라서 end-1ms 기준으로 마지막 포함 날짜 계산
  const lastIncluded = subMilliseconds(end, 1);

  const fromDay = startOfDay(start);
  const toDay = startOfDay(lastIncluded);

  const toMin = (d: Date) => d.getHours() * 60 + d.getMinutes();

  // end가 다음날 00:00으로 들어오는 경우(=24:00 선택) 보정
  const normalizeEndMin = () => {
    const m = toMin(end);
    if (m === 0 && end > start) return 1440; // 24:00 취급
    return m;
  };

  const sMin = toMin(start);
  const eMin = normalizeEndMin();
  const minMin = Math.min(sMin, eMin);
  const maxMin = Math.max(sMin, eMin);

  const segments: Array<{ start: Date; end: Date }> = [];

  for (let day = fromDay; differenceInCalendarDays(toDay, day) >= 0; day = addDays(day, 1)) {
    const segStart = addMinutes(startOfDay(day), minMin);
    const segEnd =
      maxMin === 1440
        ? addDays(startOfDay(day), 1) // 24:00이면 다음날 00:00
        : addMinutes(startOfDay(day), maxMin);

    segments.push({ start: segStart, end: segEnd });
  }

  return segments;
}

export const useTimetableSelection = (
  setSelectedTimes: Dispatch<SetStateAction<ParticipateObject[]>>
) => {
  const [dragPreviewEvents, setDragPreviewEvents] = useState<Segment[]>([]);
  const lastDragInfo = useRef<{ start: number; end: number } | null>(null); // 드래그 중 불필요한 재연산을 막기 위해 마지막 계산 범위를 기억

  /** 드래그 중 실시간 프리뷰 계산하는 메서드 (selectAllow 활용) */
  const handleSelectAllow = useCallback((selectInfo) => {
    // 1. 현재 드래그 범위가 이전과 같으면 업데이트 건너뜀 (성능 최적화)
    const currentStart = selectInfo.start.getTime();
    const currentEnd = selectInfo.end.getTime();

    if (
      lastDragInfo.current &&
      lastDragInfo.current.start === currentStart &&
      lastDragInfo.current.end === currentEnd
    ) {
      return true;
    }

    // 2. 변경되었다면 저장
    lastDragInfo.current = { start: currentStart, end: currentEnd };

    // 3. 로직을 통해 조각난 구간 계산
    const segments = splitRectSelection(selectInfo.start, selectInfo.end);

    // 4. 미리보기 이벤트 생성
    const previews = segments.map((seg, idx) => ({
      id: `preview-${idx}`,
      start: seg.start,
      end: seg.end,
      display: "background", // 혹은 'preview' (CSS 커스텀용)
      className: "fc-drag-preview",
    }));

    setDragPreviewEvents(previews);
    return true; // 선택 허용
  }, []);

  /** 드래그 토글 */
  const handleSelect = (info) => {
    // setSelectedTimes((prev) => toggleRangeKeys(prev, info.start, info.end));
    const segments = splitRectSelection(info.start, info.end);

    setSelectedTimes((prev) =>
      segments.reduce((acc, seg) => toggleRangeKeys(acc, seg.start, seg.end), prev)
    );
    info.view?.calendar?.unselect?.();
  };

  /** 클릭(한 칸) 토글: dateClick은 클릭한 시각이 들어옴 */
  const handleDateClick = (info) => {
    const start = snap30(info.date);
    const end = addMinutes(start, MIN30);
    setSelectedTimes((prev) => toggleRangeKeys(prev, start, end));
  };

  return {
    dragPreviewEvents,
    setDragPreviewEvents,
    lastDragInfo,
    handleSelectAllow,
    handleSelect,
    handleDateClick,
  };
};
