import { Calendar } from "react-big-calendar";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";
import { useWeeklyCalendarLogic } from "@/hooks/useWeeklyCalendarLogic";
import { calendarConfig, localizer } from "../../../../const/weeklyCalendarConfig";
import ScheduleSlidePanel from "./ScheduleSlidePanel";
import { useRef } from "react";

/**
 * 슬라이드가 생성모드로 열렸는지, 수정모드로 열렸는지를 구분
 */
export const Slide = {
  Create: "create",
  Edit: "edit",
} as const;

export type SlideType = (typeof Slide)[keyof typeof Slide];

interface Props {
  week: Date;
  events: ParsedSchedule[];
  blockInteraction: boolean; // Swiper로 좌우 드래그 중일 경우의 플래그
  isActiveCalendar: boolean; // 현재 표시되고있는 캘린더인지 여부
}

const WeeklyCalendar = ({ week, events, blockInteraction, isActiveCalendar }: Props) => {
  const {
    crudOpen,
    clickedSpan,
    clickedSchedule,
    slideType,
    openCreate,
    openEdit,
    closeSlide,
    setCrudOpen,
  } = useWeeklyCalendarLogic(week, isActiveCalendar);

  // 1. 터치 상태를 추적하기 위한 Ref 생성
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  // 2. 터치 시작 시 좌표 저장 및 플래그 초기화
  const handleTouchStart = (e: React.TouchEvent) => {
    isSwiping.current = false;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  // 3. 터치 이동 시 "스와이프인지 아닌지" 판별
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = Math.abs(currentX - startX.current);
    const diffY = Math.abs(currentY - startY.current);

    // X축 이동이 10px 이상이고, Y축(스크롤)보다 X축 이동이 더 크면 "스와이프"로 간주
    if (diffX > 10 && diffX > diffY) {
      isSwiping.current = true;
    }
  };

  return (
    <div
      style={{
        touchAction: "pan-y",
        height: "100%",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Calendar
        localizer={localizer}
        startAccessor="startAt"
        endAccessor="endAt"
        {...calendarConfig}
        date={week}
        events={events}
        selectable
        onSelectSlot={(slot) => {
          if (blockInteraction || isSwiping.current) {
            return;
          }
          openCreate(slot);
        }}
        onSelectEvent={(event) => {
          if (!blockInteraction) openEdit(event);
        }}
      />
      <ScheduleSlidePanel
        open={crudOpen}
        clickedSpan={clickedSpan}
        slideType={slideType}
        clickedSchedule={clickedSchedule}
        setCrudOpen={setCrudOpen}
        onClose={closeSlide}
      />
    </div>
  );
};

export default WeeklyCalendar;
