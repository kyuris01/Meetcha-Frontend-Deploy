import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./CalendarHeader.module.scss";
import { CALENDAR, type Calendar } from "../../../const/scheduleCalendarType.constants";
import clsx from "clsx";
import InfiniteLoopSlider from "./InfiniteLoopSlider";
import { useScheduleDate } from "./DateContext";

interface Props {
  calendarType: string;
  setCalendarType: Dispatch<SetStateAction<Calendar>>;
}

const CalendarHeader = ({ calendarType, setCalendarType }: Props) => {
  const { year, month } = useScheduleDate();
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

  return (
    <div className={clsx(styles.calendarHeader, isSliderOpen && styles.sliderOpen)}>
      {isSliderOpen ? (
        <div className={styles.slider}>
          <div className={styles.year}>{year}</div>
          <InfiniteLoopSlider setIsSliderOpen={setIsSliderOpen} />
        </div>
      ) : (
        <>
          <span
            className={styles.month}
            onClick={() => calendarType === CALENDAR.Monthly && setIsSliderOpen((prev) => !prev)}
          >
            {month}
          </span>
          <div className={styles.calendarTypeCtn}>
            <span
              className={clsx(
                styles.typeLabel,
                calendarType === CALENDAR.Monthly && styles.activeTypeLabel
              )}
              onClick={() => setCalendarType(CALENDAR.Monthly)}
            >
              월별
            </span>
            <span
              className={clsx(
                styles.typeLabel,
                calendarType === CALENDAR.Weekly && styles.activeTypeLabel
              )}
              onClick={() => setCalendarType(CALENDAR.Weekly)}
            >
              주별
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarHeader;
