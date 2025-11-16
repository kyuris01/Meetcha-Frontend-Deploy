import { useContext, useEffect, useRef, useState } from "react";
import { addWeeks, subWeeks, getYear, getMonth, startOfWeek } from "date-fns";
import { DateContext } from "@/pages/schedule/DataContext";

export function useWeeklySwiperController() {
  const { setYear, setMonth } = useContext(DateContext);

  const didSkipFirstChange = useRef(false);
  const swiperRef = useRef(null);

  const [standardDate, setStandardDate] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [calendarArr, setCalendarArr] = useState(() => {
    const prev = subWeeks(standardDate, 1);
    const next = addWeeks(standardDate, 1);
    return [
      { week: prev, key: prev.getTime() },
      { week: standardDate, key: standardDate.getTime() },
      { week: next, key: next.getTime() },
    ];
  });

  const [isSwiping, setIsSwiping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    setYear(getYear(standardDate));
    setMonth(getMonth(standardDate) + 1);
  }, [standardDate]);

  const handleSlideChange = (swiper) => {
    if (!didSkipFirstChange.current) {
      didSkipFirstChange.current = true;
      return;
    }

    const { previousIndex, activeIndex } = swiper;
    setActiveIndex(activeIndex);

    setCalendarArr((prevArr) => {
      const movingForward = activeIndex > previousIndex;
      const newStandard = movingForward ? addWeeks(standardDate, 1) : subWeeks(standardDate, 1);

      const newArr = [...prevArr];
      if (movingForward) {
        const nextWeek = addWeeks(newStandard, 1);
        newArr.push({ week: nextWeek, key: nextWeek.getTime() });
        newArr.shift();
      } else {
        const prevWeek = subWeeks(newStandard, 1);
        newArr.unshift({ week: prevWeek, key: prevWeek.getTime() });
        newArr.pop();
      }

      setStandardDate(newStandard);
      return newArr;
    });
  };

  return {
    swiperRef,
    calendarArr,
    activeIndex,
    isSwiping,
    setIsSwiping,
    handleSlideChange,
  };
}
