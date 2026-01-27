import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import { parseUserCalendarEvents, toSelectedEvents } from "@/utils/eventTransform";
import { useMergePreviousTimes } from "./TimetableHooks/Timetable/useMergePreviousTime";
import { useTimetableSelection } from "./TimetableHooks/Timetable/useTimetableSelection";
import "./Timetable.scss";
import {
  parseISO,
  addDays,
  differenceInCalendarDays,
  format as formatDate,
  startOfDay,
  format,
} from "date-fns";
import { ko } from "date-fns/locale";

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
  previousAvailTime,
}) => {
  const {
    dragPreviewEvents,
    setDragPreviewEvents,
    lastDragInfo,
    handleSelectAllow,
    handleSelect: originalHandleSelect,
  } = useTimetableSelection(setSelectedTimes);

  useMergePreviousTimes(previousAvailTime, setSelectedTimes);
  /* dayspan으로 연속된 날짜를 없애고
   */

  const sortedDates: string[] = useMemo(() => {
    return [...(candidateDates ?? [])]
      .map((d) => formatDate(parseISO(String(d)), "yyyy-MM-dd"))
      .sort();
  }, [candidateDates]);

  const realToIdx = useMemo(() => {
    return new Map(sortedDates.map((d, i) => [d, i]));
  }, [candidateDates]);

  const baseDate = useMemo(() => parseISO(sortedDates[0]), [candidateDates]);

  const dateMap = useMemo(
    () =>
      sortedDates.map((d, idx) => ({
        realDate: parseISO(d),
        fakeDate: addDays(baseDate, idx),
      })),
    [candidateDates, baseDate]
  );

  /** 드래그 끝났을 때 확정 처리 */
  const onSelectFinal = (info) => {
    setDragPreviewEvents([]);
    lastDragInfo.current = null;

    const startDay = startOfDay(info.start);
    const endDay = startOfDay(info.end);

    // end가 다음날 00:00으로 잡히는 케이스(= 24:00 선택)는 마지막 날로 포함되면 안 됨
    const endIsMidnight = info.end.getHours() === 0 && info.end.getMinutes() === 0;

    const rawDiff = differenceInCalendarDays(endDay, startDay);
    const daysCount = rawDiff <= 0 ? 1 : endIsMidnight ? rawDiff : rawDiff + 1;

    // 선택한 시간(HH:mm)은 모든 열에 동일하게 적용
    const sh = info.start.getHours();
    const sm = info.start.getMinutes();
    const eh = info.end.getHours();
    const em = info.end.getMinutes();

    for (let offset = 0; offset < daysCount; offset++) {
      const fakeDay = addDays(startDay, offset);

      const idx = differenceInCalendarDays(fakeDay, startOfDay(baseDate));
      const realDay = dateMap[idx]?.realDate;
      if (!realDay) continue; // 후보날짜 아닌 열이면 스킵

      const realStart = new Date(
        realDay.getFullYear(),
        realDay.getMonth(),
        realDay.getDate(),
        sh,
        sm,
        0,
        0
      );

      // end가 00:00이면 "다음날 00:00"으로 처리(= 24:00)
      const realEnd = endIsMidnight
        ? new Date(realDay.getFullYear(), realDay.getMonth(), realDay.getDate() + 1, 0, 0, 0, 0)
        : new Date(realDay.getFullYear(), realDay.getMonth(), realDay.getDate(), eh, em, 0, 0);

      // ✅ 열(날짜)마다 하나씩 토글/추가되도록 여러 번 호출
      originalHandleSelect({
        ...info,
        start: realStart,
        end: realEnd,
        startStr: realStart.toISOString(),
        endStr: realEnd.toISOString(),
      });
    }

    info.view?.calendar?.unselect?.();
  };

  const selectedTimesForDisplay = useMemo(() => {
    return (selectedTimes ?? []).map((t) => {
      const s = parseISO(t.startAt);
      const e = parseISO(t.endAt);

      // real 날짜가 candidateDates에서 몇 번째인지
      const idx = realToIdx.get(format(s, "yyyy-MM-dd"));
      if (idx == null) return t; // 후보날짜가 아니면 그대로

      // 그 idx에 대응하는 fake day (baseDate + idx)
      const fakeDay = addDays(baseDate, idx);

      const fakeStart = new Date(
        fakeDay.getFullYear(),
        fakeDay.getMonth(),
        fakeDay.getDate(),
        s.getHours(),
        s.getMinutes(),
        0,
        0
      );

      // end가 다음날로 넘어가는 경우(예: 24:00) 보정
      const dayOffset = differenceInCalendarDays(startOfDay(e), startOfDay(s));
      const fakeEndDay = addDays(fakeDay, dayOffset);

      const fakeEnd = new Date(
        fakeEndDay.getFullYear(),
        fakeEndDay.getMonth(),
        fakeEndDay.getDate(),
        e.getHours(),
        e.getMinutes(),
        0,
        0
      );

      return { ...t, startAt: fakeStart.toISOString(), endAt: fakeEnd.toISOString() };
    });
  }, [selectedTimes, realToIdx, baseDate]);

  if (candidateDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;

  return (
    <FullCalendar
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      plugins={[timeGridPlugin, interactionPlugin, scrollGridPlugin]}
      stickyHeaderDates={true}
      stickyFooterScrollbar={true}
      initialView="timeGridSpan"
      views={{
        timeGridSpan: { type: "timeGrid", duration: { days: dateMap.length } },
      }}
      initialDate={formatDate(baseDate, "yyyy-MM-dd")}
      locale="ko"
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      slotDuration="00:30:00"
      slotLabelInterval="01:00:00"
      slotLabelFormat={{ hour: "2-digit" }}
      slotLabelContent={(arg) => {
        const d = arg.date;
        // ✅ 정각만 라벨 표시
        if (d.getMinutes() !== 0) return "";
        return String(d.getHours()); // 또는 format(d, "HH")
      }}
      allDaySlot={false}
      nowIndicator={true}
      selectable={true} // 선택 기능 활성화
      selectMirror={false} // 드래그하는 동안 선택될 영역을 임시로 보여주는(Mirror) 기능
      unselectAuto={false} // 캘린더 밖 클릭 시 선택 해제 방지 (선택 사항)
      selectAllow={handleSelectAllow} // 드래그가 진행되는 매 순간 호출되어 해당 영역 선택해도 되는지를 판단
      select={onSelectFinal} // 드래그가 끝나고 마우스를 놓았을 때 최종적으로 호출
      events={[
        ...parseUserCalendarEvents(scheduleData),
        ...toSelectedEvents(selectedTimesForDisplay),
        ...dragPreviewEvents,
      ]}
      headerToolbar={false}
      dayHeaderContent={(info) => {
        const idx = differenceInCalendarDays(info.date, baseDate);
        const realDate = dateMap[idx]?.realDate;
        return realDate ? formatDate(realDate, "M.d(EEE)", { locale: ko }) : "";
      }}
      expandRows={true}
      contentHeight="auto"
      dayMinWidth={92}
      selectOverlap={(event) => !event.extendedProps?.isBusy}
      longPressDelay={200}
    />
  );
};

export default Timetable;
