import "./WeeklyCalendar.scss";
import WeeklySwiper from "./WeeklySwiper";
import WeeklyCalendar from "./WeeklyCalendar";
import { useWeeklySwiperController } from "@/hooks/useWeeklySwiperController";
import { weeklySwiperConfig } from "./constants/weeklySwiperConfig";
import { SwiperSlide } from "swiper/react";
import type { ParsedSchedule } from "@/types/WeeklyScheuldeTypes";

const WeeklyScheduleView = ({ schedules }) => {
  const { calendarArr, activeIndex, isSwiping, setIsSwiping, handleSlideChange } =
    useWeeklySwiperController();

  const events: ParsedSchedule[] = schedules?.map((item, _) => ({
    eventId: item.eventId,
    title: item.title,
    startAt: new Date(item.startAt),
    endAt: new Date(item.endAt),
    recurrence: item.recurrence,
  }));

  return (
    <WeeklySwiper
      calendarArr={calendarArr}
      config={weeklySwiperConfig}
      onSlideChange={handleSlideChange}
      onSwipeStateChange={setIsSwiping}
    >
      {calendarArr.map(({ week, key }, idx) => (
        <SwiperSlide key={key}>
          <WeeklyCalendar
            week={week}
            events={events}
            blockInteraction={isSwiping}
            isActiveCalendar={idx === activeIndex}
          />
        </SwiperSlide>
      ))}
    </WeeklySwiper>
  );
};

export default WeeklyScheduleView;
