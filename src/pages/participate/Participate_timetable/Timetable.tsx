import React from "react";

import FullCalendar from "@fullcalendar/react"; //기본코어->렌더링 담당
import timeGridPlugin from "@fullcalendar/timegrid"; //시간 단위로 일정이 보이는 형태(주간/일간 뷰)
import interactionPlugin from "@fullcalendar/interaction"; //드래그,선택,클릭 같은 사용자 상호작용

import { toBusyEvents, toSelectedEvents } from "@/utils/eventTransform"; //데이터 transform util함수 호출
import { useMergePreviousTimes } from "./TimetableHooks/Timetable/useMergePreviousTime"; //
import { useTimetableSelection } from "./TimetableHooks/Timetable/useTimetableSelection"; //
import "./Participate_timetabe.scss";

import {
  parseISO,
  startOfDay,
  endOfDay,
  addDays,
  differenceInCalendarDays,
  getDay,
  getHours,
  format as formatDate,
} from "date-fns";

import { ko } from "date-fns/locale";

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
  previousAvailTime,
}) => {
  const { handleSelect, handleDateClick } = useTimetableSelection(setSelectedTimes);

  useMergePreviousTimes(previousAvailTime, setSelectedTimes);
  //previousAvailTime(이전에 지정했던 시간=>대안시간 투표 전에 지정한 시간)이 존재하지 않으면 시행x
  const sortedDates: string[] = [...(candidateDates ?? [])].sort();

  if (sortedDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;

  const validDates: Date[] = sortedDates.map((dateStr) => parseISO(dateStr)); //date객체 변환

  const start = validDates[0];
  const end = validDates[validDates.length - 1];
  const daysSpan = differenceInCalendarDays(end, start) + 1;

  const allowedDows: Set<number> = new Set(validDates.map((d) => getDay(d))); // 0=일 ... 6=토
  const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter((dow: number) => !allowedDows.has(dow));

  const rangeStart = formatDate(startOfDay(validDates[0]), "yyyy-MM-dd");
  const rangeEndExclusive = formatDate(addDays(endOfDay(validDates.at(-1)!), 1), "yyyy-MM-dd");

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]} //  수정됨: 드래그/선택 위해 interactionPlugin 추가
      initialView="timeGridSpan"
      views={{
        timeGridSpan: { type: "timeGrid", duration: { days: daysSpan } },
      }}
      initialDate={formatDate(validDates[0], "yyyy-MM-dd")}
      visibleRange={{ start: rangeStart, end: rangeEndExclusive }}
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
      viewDidMount={(arg) => {
        const root = arg.el; // FullCalendar 루트 DOM

        // 이벤트 위임: 슬롯 클릭을 안정적으로 캐치
        const onClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (!target) return;

          // timeGrid의 "빈 칸" 영역
          const lane = target.closest(".fc-timegrid-slot-lane") as HTMLElement | null;
          if (!lane) return;

          const td = target.closest("td[data-date]") as HTMLElement | null;
          const dateStr = td?.getAttribute("data-date"); // "YYYY-MM-DD"

          // row(시간)는 closest tr의 data-time 또는 lane의 이전 sibling에서 얻는 경우가 많음
          const tr = target.closest("tr") as HTMLElement | null;
          const time = tr?.getAttribute("data-time") || lane.getAttribute("data-time"); // "HH:mm:ss"

          if (!dateStr || !time) return;

          // 클릭한 칸의 Date 만들기
          const clicked = parseISO(`${dateStr}T${time}`);

          handleDateClick(clicked);
        };

        root.addEventListener("click", onClick);

        // cleanup
        return () => root.removeEventListener("click", onClick);
      }}
      selectOverlap={(event) => !event.extendedProps?.isBusy}
      events={[...toBusyEvents(scheduleData), ...toSelectedEvents(selectedTimes)]} //  수정됨: 선택된 시간대 렌더링
      height="auto"
      headerToolbar={false}
      dayHeaderContent={(info) => {
        const label = formatDate(info.date, "M.d(EEE)", { locale: ko }); // 예: 7.22(화)
        return label;
      }}
      slotLabelContent={(arg) => {
        return String(getHours(arg.date)); // 0~23
      }}
    />
  );
};

export default Timetable;
