import { isValidElement, useRef, type ReactElement } from "react";
import { useWeeklyCalendarContext } from "./WeeklyCalendarContext";

interface TimeSlotWrapperProps {
  children?: React.ReactNode;
  value?: Date;
  resource?: unknown;
}

interface ChildProps {
  value?: Date;
  [key: string]: unknown;
}

export const TimeSlotWrapper = ({ children, value }: TimeSlotWrapperProps) => {
  const { openCreate, blockInteraction } = useWeeklyCalendarContext();

  const slotDate =
    value ||
    (isValidElement(children) ? (children as ReactElement<ChildProps>).props.value : undefined);

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (blockInteraction) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const duration = Date.now() - startTime.current;

    const diffX = Math.abs(endX - startX.current);
    const diffY = Math.abs(endY - startY.current);

    // [로직] 움직임이 적고(10px 미만), 짧은 터치(500ms 미만)
    if (diffX < 10 && diffY < 10 && duration < 500) {
      // 고스트 클릭 방지
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      if (slotDate) {
        openCreate({
          start: slotDate,
          end: new Date(slotDate.getTime() + 30 * 60 * 1000), // 30분
          action: "click",
        });
      }
    }
  };

  return (
    <div
      className="rbc-time-slot"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        if (!blockInteraction && slotDate) {
          e.stopPropagation();
          openCreate({
            start: slotDate,
            end: new Date(slotDate.getTime() + 30 * 60 * 1000),
            action: "click",
          });
        }
      }}
    >
      {children}
    </div>
  );
};
