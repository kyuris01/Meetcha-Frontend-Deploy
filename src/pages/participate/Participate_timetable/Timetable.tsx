import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { parseUserCalendarEvents, toSelectedEvents } from "@/utils/eventTransform";
import { useMergePreviousTimes } from "./TimetableHooks/Timetable/useMergePreviousTime";
import { useTimetableSelection } from "./TimetableHooks/Timetable/useTimetableSelection";
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
  const {
    dragPreviewEvents,
    setDragPreviewEvents,
    lastDragInfo,
    handleSelectAllow,
    handleSelect: originalHandleSelect,
  } = useTimetableSelection(setSelectedTimes);
  useMergePreviousTimes(previousAvailTime, setSelectedTimes);

  const sortedDates: string[] = [...(candidateDates ?? [])].sort();
  if (sortedDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;

  const validDates: Date[] = sortedDates.map((dateStr) => parseISO(dateStr));
  const start = validDates[0];
  const end = validDates[validDates.length - 1];
  const daysSpan = differenceInCalendarDays(end, start) + 1;
  const allowedDows: Set<number> = new Set(validDates.map((d) => getDay(d)));
  const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter((dow) => !allowedDows.has(dow));
  const rangeStart = formatDate(startOfDay(validDates[0]), "yyyy-MM-dd");
  const rangeEndExclusive = formatDate(addDays(endOfDay(validDates.at(-1)!), 1), "yyyy-MM-dd");

  /** 드래그 끝났을 때 확정 처리 */
  const onSelectFinal = (info) => {
    setDragPreviewEvents([]);
    lastDragInfo.current = null;
    originalHandleSelect(info);
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
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
      selectable={true} // 선택 기능 활성화
      selectMirror={false} // 드래그하는 동안 선택될 영역을 임시로 보여주는(Mirror) 기능
      unselectAuto={false} // 캘린더 밖 클릭 시 선택 해제 방지 (선택 사항)
      selectAllow={handleSelectAllow} // 드래그가 진행되는 매 순간 호출되어 해당 영역 선택해도 되는지를 판단
      select={onSelectFinal} // 드래그가 끝나고 마우스를 놓았을 때 최종적으로 호출
      events={[
        ...parseUserCalendarEvents(scheduleData),
        ...toSelectedEvents(selectedTimes),
        ...dragPreviewEvents,
      ]}
      height="auto"
      headerToolbar={false}
      dayHeaderContent={(info) => formatDate(info.date, "M.d(EEE)", { locale: ko })}
      slotLabelContent={(arg) => String(getHours(arg.date))}
      selectOverlap={(event) => !event.extendedProps?.isBusy}
      longPressDelay={200}
    />
  );
};

export default Timetable;
