import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //  수정됨: 드래그/선택을 위해 추가
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "./Participate_timetabe.scss";

import type { UISlot } from "@/apis/participate/participateTypes";

dayjs.locale("ko");

interface BusyInterval {
  startAt: string;
  endAt: string;
}

interface Props {
  candidateDates: string[];
  selectedTimes: UISlot[];
  setSelectedTimes: React.Dispatch<React.SetStateAction<UISlot[]>>;
  scheduleData: BusyInterval[];
}

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
}) => {
  const validDates = candidateDates.map((dateStr) => dayjs(dateStr));
  const rangeStart = validDates[0]?.startOf("day").format("YYYY-MM-DD");
  const rangeEnd = validDates.at(-1)?.endOf("day").format("YYYY-MM-DD");
  //드래그 선택된 시간들

  const handleSelect = (info) => {
    const start = dayjs(info.start).second(0).millisecond(0); //  수정됨: 초, 밀리초 제거
    const end = dayjs(info.end).second(0).millisecond(0);

    const newSelection = {
      startISO: start.toISOString(),
      endISO: end.toISOString(),
    };

    const isAlreadySelected = selectedTimes.some(
      (sel) =>
        sel.startISO === newSelection.startISO &&
        sel.endISO === newSelection.endISO
    );

    if (isAlreadySelected) {
      // 수정됨: 이미 선택된 시간인 경우 → 제거
      setSelectedTimes((prev) =>
        prev.filter(
          (sel) =>
            !(
              sel.startISO === newSelection.startISO &&
              sel.endISO === newSelection.endISO
            )
        )
      );
    } else {
      // 수정됨: 새로운 시간 선택 → 추가
      setSelectedTimes((prev) => [...prev, newSelection]);
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
    start: time.startISO,
    end: time.endISO,
    display: "background",
    backgroundColor: "#FF6200",
    classNames: ["selected-block"],
    extendedProps: { isBusy: false },
  }));
  console.log(selectedTimes);

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]} //  수정됨: 드래그/선택 위해 interactionPlugin 추가
      initialView="timeGridWeek"
      initialDate={validDates[0]?.format("YYYY-MM-DD")}
      visibleRange={{
        start: rangeStart,
        end: dayjs(rangeEnd).add(1, "day").format("YYYY-MM-DD"),
      }}
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
      selectOverlap={(event)=>!event.extendedProps?.isBusy}
      events={[...busyEvents,...selectedEvents]} //  수정됨: 선택된 시간대 렌더링
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
