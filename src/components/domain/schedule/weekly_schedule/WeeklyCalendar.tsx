import { useMemo } from "react";
import { Calendar } from "react-big-calendar";
import { useWeeklyCalendarLogic } from "@/hooks/useWeeklyCalendarLogic";
import { calendarConfig, localizer } from "../../../../const/weeklyCalendarConfig"; // 경로에 맞게 수정
import ScheduleSlidePanel from "./ScheduleSlidePanel";
import { WeeklyCalendarContext } from "./WeeklyCalendarContext";
import { TimeSlotWrapper } from "./TimeSlotWrapper";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";

export const Slide = {
  Create: "create",
  Edit: "edit",
} as const;

export type SlideType = (typeof Slide)[keyof typeof Slide];

export interface WeeklyCalendarProps {
  week: Date;
  events: ParsedSchedule[];
  blockInteraction: boolean; // Swiper로 좌우 드래그 중일 경우의 플래그
  isActiveCalendar: boolean; // 현재 표시되고있는 캘린더인지 여부
}

const WeeklyCalendar = ({
  week,
  events,
  blockInteraction,
  isActiveCalendar,
}: WeeklyCalendarProps) => {
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

  const contextValue = useMemo(
    () => ({
      openCreate,
      blockInteraction,
    }),
    [openCreate, blockInteraction]
  );

  // 2. components 객체 메모이제이션
  // TimeSlotWrapper는 import 해온 컴포넌트이므로 의존성 배열은 빈 배열
  const components = useMemo(
    () => ({
      ...calendarConfig.components,
      timeSlotWrapper: TimeSlotWrapper,
    }),
    []
  );

  return (
    <div
      style={{
        touchAction: "pan-y",
        height: "100%",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <WeeklyCalendarContext.Provider value={contextValue}>
        <Calendar
          localizer={localizer}
          startAccessor="startAt"
          endAccessor="endAt"
          {...calendarConfig}
          date={week}
          events={events}
          selectable={false}
          components={components}
          onSelectEvent={(event) => {
            if (!blockInteraction) openEdit(event);
          }}
        />
      </WeeklyCalendarContext.Provider>

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
