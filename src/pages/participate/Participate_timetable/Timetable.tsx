import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //  수정됨: 드래그/선택을 위해 추가
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "./Participate_timetabe.scss";
import type { Dayjs } from "dayjs";
import type {
  ParticipateObject,
  UISlot,
} from "@/apis/participate/participateTypes";

dayjs.locale("ko");

interface BusyInterval {
  startAt: string;
  endAt: string;
}

interface Props {
  candidateDates: string[];
  selectedTimes: ParticipateObject[];
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>;
  scheduleData: BusyInterval[];
  previousAvailTime?: { startAt: string; endAt: string }[];
}

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
  previousAvailTime,
}) => {
  const keyOf = (sISO: string, eISO: string) =>
    `${dayjs(sISO).second(0).millisecond(0).valueOf()}|${dayjs(eISO)
      .second(0)
      .millisecond(0)
      .valueOf()}`;

  useEffect(() => {
    if (!Array.isArray(previousAvailTime) || previousAvailTime.length === 0)
      return;

    setSelectedTimes((prev) => {
      const exists = new Set(prev.map((s) => keyOf(s.startAt, s.endAt)));
      const merged = [...prev];
      let changed = false;

      for (const slot of previousAvailTime) {
        const snap30 = (d: dayjs.Dayjs) =>
          d
            .minute(Math.floor(d.minute() / 30) * 30)
            .second(0)
            .millisecond(0);
        const start = snap30(dayjs(slot.startAt)).toISOString();
        const end = snap30(dayjs(slot.endAt)).toISOString();
        const key = keyOf(start, end);

        if (!exists.has(key)) {
          merged.push({ startAt: start, endAt: end });
          exists.add(key);
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  }, [previousAvailTime, setSelectedTimes]);
  console.log(candidateDates);
  const sortedDates: string[] = [...(candidateDates ?? [])].sort();
  console.log(sortedDates);
  console.log(previousAvailTime);

  if (sortedDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;
  const validDates: Dayjs[] = sortedDates.map((dateStr) => dayjs(dateStr));

  const start = validDates[0];
  const end = validDates.at(-1);
  const daysSpan = end!.diff(start!, "day") + 1; // 표시할 연속 일수

  const allowedDows: Set<number> = new Set(validDates.map((d) => d.day())); // 0=일 ... 6=토
  const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (dow: number) => !allowedDows.has(dow)
  );

  const rangeStart = validDates[0]?.startOf("day").format("YYYY-MM-DD");
  const rangeEnd = validDates.at(-1)?.endOf("day").format("YYYY-MM-DD");
  //드래그 선택된 시간들

  const handleSelect = (info: any) => {
    const snap30 = (d: dayjs.Dayjs) =>
      d
        .minute(Math.floor(d.minute() / 30) * 30)
        .second(0)
        .millisecond(0);
    let s = snap30(dayjs(info.start));
    let e = snap30(dayjs(info.end));
    if (!e.isAfter(s)) {
      e = s.add(30, "minute");
    }
    const sISO = s.toISOString();
    const eISO = e.toISOString();
    const k = keyOf(sISO, eISO);

    const exists = selectedTimes.some((t) => keyOf(t.startAt, t.endAt) === k);
    if (exists) {
      setSelectedTimes((prev) =>
        prev.filter((t) => keyOf(t.startAt, t.endAt) !== k)
      );
    } else {
      setSelectedTimes((prev) => [...prev, { startAt: sISO, endAt: eISO }]);
    }
  };

  const busyEvents = (scheduleData ?? []).map((ev) => ({
    start: dayjs(ev.startAt).toDate(),
    end: dayjs(ev.endAt).toDate(),
    display: "background",
    classNames: ["busy-block"],
    extendedProps: { isBusy: true },
  }));

  const selectedEvents = selectedTimes.map((time) => ({
    start: time.startAt,
    end: time.endAt,
    display: "background",
    backgroundColor: "#FF6200",
    classNames: ["selected-block"],
    extendedProps: { isBusy: false },
  }));
  console.log(selectedTimes);

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]} //  수정됨: 드래그/선택 위해 interactionPlugin 추가
      initialView="timeGridSpan"
      views={{
        timeGridSpan: { type: "timeGrid", duration: { days: daysSpan } },
      }}
      initialDate={validDates[0]?.format("YYYY-MM-DD")}
      visibleRange={{
        start: rangeStart,
        end: dayjs(rangeEnd).add(1, "day").format("YYYY-MM-DD"),
      }}
      hiddenDays={hiddenDays}
      locale="ko"
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      slotDuration="00:30:00"
      allDaySlot={false}
      nowIndicator={true}
      selectable={true} // 수정됨: 드래그 선택 활성화
      selectMirror={false}
      unselectAuto={false}
      select={handleSelect} //  수정됨: 드래그 선택 이벤트 핸들러
      selectOverlap={(event) => !event.extendedProps?.isBusy}
      events={[...busyEvents, ...selectedEvents]} //  수정됨: 선택된 시간대 렌더링
      height="auto"
      headerToolbar={false}
      dayHeaderContent={(info) => {
        const date = dayjs(info.date);
        return `${date.format("M.D")}(${date.format("dd")})`;
      }}
      slotLabelContent={(arg) => {
        const hour = dayjs(arg.date).hour();
        return `${hour}`;
      }}
    />
  );
};

export default Timetable;
