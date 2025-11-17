import { Calendar } from "react-big-calendar";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";
import { useWeeklyCalendarLogic } from "@/hooks/useWeeklyCalendarLogic";
import { calendarConfig, localizer } from "./weeklyCalendarConfig";
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
  blockInteraction: boolean;
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
    <>
      <Calendar
        localizer={localizer}
        startAccessor="startAt"
        endAccessor="endAt"
        {...calendarConfig}
        date={week}
        events={events}
        selectable
        onSelecting={() => !blockInteraction}
        onSelectSlot={(slot) => {
          console.log("slot:", slot);
          if (!blockInteraction) openCreate(slot);
        }}
        onSelectEvent={(event) => {
          console.log("event:", event);
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
    </>
  );
};

export default WeeklyCalendar;
