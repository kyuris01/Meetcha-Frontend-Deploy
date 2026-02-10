import Calendar from "react-calendar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Calendar.scss";
import type { UserScheduleData } from "@/apis/participate/participateTypes";
import { useMonthlySwiperController } from "@/hooks/useMonthlySwiperController";
import CalendarTile from "./MonthlyCalendarTile";

interface Props {
  schedules: UserScheduleData[];
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  const { swiperRef, calendarArr, handleTransitionEnd } = useMonthlySwiperController();

  return (
    <div className="monthlyScheduleView">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChangeTransitionEnd={handleTransitionEnd}
        initialSlide={1}
        spaceBetween={20}
        allowTouchMove={true}
      >
        {calendarArr.map((item) => (
          <SwiperSlide key={item.key}>
            <div className="calendar-wrapper">
              <Calendar
                activeStartDate={item.date}
                showNavigation={true}
                nextLabel={null}
                prevLabel={null}
                next2Label={null}
                prev2Label={null}
                view="month"
                onViewChange={() => {}}
                showNeighboringMonth={false}
                tileContent={({ date }) => <CalendarTile date={date} schedules={schedules} />}
                formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
                formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
                onActiveStartDateChange={() => {}}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MonthlyScheduleView;
