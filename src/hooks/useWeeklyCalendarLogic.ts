import { useState, useEffect, useCallback } from "react";
import { getMonth } from "date-fns";
import { scheduleStringFormatter } from "@/utils/dateFormatter";
import type { Schedule } from "@/apis/schedule/scheduleTypes";
import { Slide, type SlideType } from "@/components/domain/schedule/weekly_schedule/WeeklyCalendar";
import { useScheduleDate } from "@/components/domain/schedule/DateContext";

export function useWeeklyCalendarLogic(week: Date, isActiveCalendar: boolean) {
  const { setMonth } = useScheduleDate();

  const [crudOpen, setCrudOpen] = useState(false);
  const [clickedSpan, setClickedSpan] = useState<string>();
  const [clickedSchedule, setClickedSchedule] = useState<Schedule>();
  const [slideType, setSlideType] = useState<SlideType>("create");

  useEffect(() => {
    if (isActiveCalendar) setMonth(getMonth(week) + 1);
  }, [isActiveCalendar]);

  const openCreate = useCallback((slotInfo) => {
    setSlideType(Slide.Create);

    const start = scheduleStringFormatter(slotInfo.start);
    const end = scheduleStringFormatter(slotInfo.end);

    setClickedSpan(`${start} ${end}`);

    setTimeout(() => setCrudOpen(true), 0);
  }, []);

  const openEdit = useCallback((event) => {
    setSlideType(Slide.Edit);

    setClickedSchedule({
      title: event.title,
      startAt: String(event.startAt),
      endAt: String(event.endAt),
      recurrence: event.recurrence,
      eventId: event.eventId,
    });

    setClickedSpan(
      `${scheduleStringFormatter(event.startAt)} ${scheduleStringFormatter(event.endAt)}`
    );

    setTimeout(() => setCrudOpen(true), 0);
  }, []);

  const closeSlide = useCallback(() => {
    setCrudOpen(false);
    setClickedSchedule(undefined);
  }, []);

  return {
    crudOpen,
    clickedSpan,
    clickedSchedule,
    slideType,
    openCreate,
    openEdit,
    closeSlide,
    setCrudOpen,
  };
}
