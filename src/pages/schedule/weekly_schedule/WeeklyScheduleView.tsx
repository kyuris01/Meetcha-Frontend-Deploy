import "./WeeklyCalendar.scss";
import { useEffect, useRef, useState } from "react";
import { addDays, addWeeks, subWeeks, getMonth, getYear } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import WeeklyCalendar from "./WeeklyCalendar";
import type { Schedule } from "@/apis/schedule/scheduleTypes";

interface Props {
  schedules: Schedule[];
  setFetchStandardDate: React.Dispatch<React.SetStateAction<string>>;
}

const WeeklyScheduleView = ({ schedules, setFetchStandardDate }: Props) => {
  const [standardDate, setStandardDate] = useState(new Date());
  const didSkipFirstChange = useRef(false); // 0->1 이동시 handleSlideChange는 발동안되게하는 플래그
  const swiperRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // console.log(schedules);

  const [calendarArr, setCalendarArr] = useState(() => {
    const prev = subWeeks(standardDate, 1);
    const next = addWeeks(standardDate, 1);
    return [
      { week: prev, key: prev.getTime() },
      { week: standardDate, key: standardDate.getTime() },
      { week: next, key: next.getTime() },
    ];
  });

  const events = schedules?.map((item, _) => ({
    id: item.eventId,
    title: item.title,
    start: new Date(item.startAt),
    end: new Date(item.endAt),
    recur: item.recurrence,
  }));

  const handleSlideChange = (swiper) => {
    if (!didSkipFirstChange.current) {
      didSkipFirstChange.current = true;
      return;
    }

    const { previousIndex, activeIndex } = swiper;

    setCalendarArr((prevArr) => {
      let newStandard: Date;
      let newArr = [...prevArr];

      if (activeIndex > previousIndex) {
        // 다음 주로 이동
        newStandard = addWeeks(standardDate, 1);
        const newFetchStandard = `${getYear(addDays(newStandard, 5))} ${
          getMonth(addDays(newStandard, 5)) + 1
        }`;
        setFetchStandardDate((prev) => {
          if (prev !== newFetchStandard) {
            return newFetchStandard;
          } else {
            return prev;
          }
        });
        // 오른쪽으로 한 칸 추가, 왼쪽 하나 제거
        const nextWeek = addWeeks(newStandard, 1);
        newArr.push({ week: nextWeek, key: nextWeek.getTime() });
        newArr.shift();
      } else {
        // 이전 주로 이동
        newStandard = subWeeks(standardDate, 1);
        const newFetchStandard = `${getYear(addDays(newStandard, -5))} ${
          getMonth(addDays(newStandard, -5)) + 1
        }`;
        setFetchStandardDate((prev) => {
          if (prev !== newFetchStandard) {
            return newFetchStandard;
          } else {
            return prev;
          }
        });
        const prevWeek = subWeeks(newStandard, 1);
        newArr.unshift({ week: prevWeek, key: prevWeek.getTime() });
        newArr.pop();
      }

      // 기준 날짜 업데이트
      setStandardDate(newStandard);

      return newArr;
    });
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    // DOM 수정 → Swiper에게 알려줌
    swiperRef.current.update();

    // 한 틱 뒤(다음 페인트 전에) 중앙으로 이동
    requestAnimationFrame(() => {
      swiperRef.current?.slideTo(1, 0, false); // runCallbacks=false
    });
  }, [calendarArr]);

  return (
    <Swiper
      onSwiper={(instance) => (swiperRef.current = instance)}
      onTouchStart={() => {
        setIsSwiping(false);
      }}
      onSliderFirstMove={() => {
        setIsSwiping(true);
      }} // 첫 move 시점
      onTouchEnd={() => {
        setIsSwiping(false);
      }}
      observer={false}
      observeParents={false}
      observeSlideChildren={false}
      initialSlide={1}
      slidesPerView={1}
      spaceBetween={0}
      className="swiper-container"
      onSlideChangeTransitionEnd={handleSlideChange}
      preventClicks={false}
      preventClicksPropagation={false}
      touchStartPreventDefault={false}
      touchMoveStopPropagation={false}
    >
      {calendarArr.map(({ week, key }) => (
        <SwiperSlide key={key}>
          <WeeklyCalendar week={week} events={events} blockInteraction={isSwiping} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WeeklyScheduleView;
