import { Swiper } from "swiper/react";
import "./WeeklyCalendar.scss";
import "swiper/swiper-bundle.css";
import type SwiperCore from "swiper";
import { useEffect, useRef } from "react";

export default function WeeklySwiper({
  calendarArr,
  config,
  onSlideChange,
  onSwipeStateChange,
  children,
}) {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    // DOM 수정 → Swiper에게 알려줌
    swiperRef.current.update();

    // 한 틱 뒤(다음 페인트 전에) 중앙으로 이동
    requestAnimationFrame(() => {
      swiperRef.current?.slideTo(1, 0, false);
    });
  }, [calendarArr]);

  return (
    <Swiper
      onSwiper={(instance) => (swiperRef.current = instance)}
      onTouchStart={() => onSwipeStateChange(false)}
      onSliderFirstMove={() => onSwipeStateChange(true)}
      onTouchEnd={() => onSwipeStateChange(false)}
      onSlideChangeTransitionEnd={onSlideChange}
      className="swiper-container"
      {...config}
    >
      {children}
    </Swiper>
  );
}
