import { Calendar } from "react-big-calendar";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";
import { useWeeklyCalendarLogic } from "@/hooks/useWeeklyCalendarLogic";
import { calendarConfig, localizer } from "./constants/weeklyCalendarConfig";
import ScheduleSlidePanel from "./ScheduleSlidePanel";

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

  return (
    <div
      style={{
        touchAction: "pan-y",
        height: "100%",
      }}
    >
      <Calendar
        localizer={localizer}
        startAccessor="startAt"
        endAccessor="endAt"
        {...calendarConfig}
        date={week}
        events={events}
        selectable
        // onSelecting={() => !blockInteraction}
        onSelecting={() => false}
        onSelectSlot={(slot) => {
          if (!blockInteraction) openCreate(slot);
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
