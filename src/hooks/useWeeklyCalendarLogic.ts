import { useState, useEffect, useContext, useCallback } from "react";
import { getMonth } from "date-fns";
import { scheduleStringFormatter } from "@/utils/dateFormatter";
import type { Schedule } from "@/apis/schedule/scheduleTypes";
import { Slide, type SlideType } from "@/pages/schedule/weekly_schedule/WeeklyCalendar";
import { DateContext } from "@/pages/schedule/DataContext";

export function useWeeklyCalendarLogic(week: Date, isActiveCalendar: boolean) {
  const { setMonth } = useContext(DateContext);

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
    setSlideType("edit");

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
