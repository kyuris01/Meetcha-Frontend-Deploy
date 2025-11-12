import { colorAutoSelector } from "@/utils/colorAutoSelector";
import CustomWeekHeader from "./CustomWeekHeader";
import { CustomEvent } from "./CustomEvent";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { scheduleStringFormatter } from "@/utils/dateFormatter";
import type { Schedule } from "@/apis/schedule/scheduleTypes";
import ScheduleCrudPage from "../schedule_crud/ScheduleCrudPage";

/**
 * 슬라이드가 생성모드로 열렸는지, 수정모드로 열렸는지를 구분
 */
export const Slide = {
  Create: "create",
  Edit: "edit",
} as const;

export type SlideType = (typeof Slide)[keyof typeof Slide];

interface Props {
  week: Date;
  events: Schedule[];
  blockInteraction: boolean;
}

const localizer = luxonLocalizer(DateTime);

const formats = {
  timeGutterFormat: (date: Date, culture: string, localizer: any) => {
    return DateTime.fromJSDate(date).toFormat("H"); // 예: 22
  },
};

const WeeklyCalendar = ({ week, events, blockInteraction }: Props) => {
  const [crudOpen, setCrudOpen] = useState<boolean>(false);
  const [clickedSpan, setClickedSpan] = useState<string>();
  const [clickedSchedule, setClickedSchedule] = useState<Schedule>();
  const [slideType, setSlideType] = useState<SlideType>(Slide.Create);
  const dragControls = useDragControls();

  /**
   * rbc 컴포넌트의 events prop에 넣기위해 events를 파싱
   */
  const parsedEvents = events?.map((e) => ({
    ...e,
    startAt: new Date(e.startAt),
    endAt: new Date(e.endAt),
  }));

  const handlePointerDown = (e: React.PointerEvent) => {
    // 이벤트가 발생한 가장 안쪽 요소를 가져옵니다.
    const target = e.target as HTMLElement;

    // target의 상위 요소 중 '.time-picker-no-drag' 클래스를 가진 요소가 있는지 확인합니다.
    // 만약 있다면, TimePicker 내부에서 이벤트가 시작된 것입니다.
    if (target.closest(".time-picker-no-drag")) {
      // 이벤트 전파를 막아서 framer-motion의 drag 핸들러가 실행되지 않도록 합니다.
      e.stopPropagation();
    }
  };

  const portal = ReactDOM.createPortal(
    <AnimatePresence>
      {crudOpen && (
        <>
          {/* 1) 백드롭: 클릭 시 닫기 */}
          <motion.div
            key="backdrop"
            className="backdrop"
            onClick={() => {
              setCrudOpen(false);
              setClickedSchedule(null);
            }}
          />

          {/* 2) 슬라이드업 패널: 클릭 이벤트 전파 차단 */}
          <motion.div
            key="panel"
            className="slideUpContainer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onPointerDown={handlePointerDown}
            drag="y"
            dragControls={dragControls}
            dragDirectionLock={true}
            dragConstraints={{ top: 0, bottom: 1000 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > window.innerHeight * 0.2) {
                setCrudOpen(false);
                setClickedSchedule(null);
              }
            }}
          >
            {/* <ScheduleCrudPage clickedSpan={clickedSpan} createMode={mode} data={clickedSchedule} /> */}
            <ScheduleCrudPage
              clickedSpan={clickedSpan}
              slideType={slideType}
              data={clickedSchedule}
              setCrudOpen={setCrudOpen}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <Calendar
        date={week}
        localizer={localizer}
        events={parsedEvents}
        formats={formats}
        startAccessor="startAt"
        endAccessor="endAt"
        defaultView="week"
        views={["week"]}
        components={{
          week: {
            header: CustomWeekHeader,
            event: CustomEvent,
          },
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: `${colorAutoSelector(event.eventId)}`,
              borderRadius: "6px",
              color: "white",
            },
          };
        }}
        selectable={true}
        step={30} // 각 시간 슬롯 간격 (분 단위)
        timeslots={2} // 한 시간당 몇 개의 슬롯
        longPressThreshold={750}
        onSelecting={() => !blockInteraction}
        onSelectSlot={(slotInfo) => {
          if (blockInteraction) return;
          // setTimeout(() => setCrudOpen(true), 0);
          setCrudOpen(true);
          const formattedStart = scheduleStringFormatter(slotInfo.start);
          const formattedEnd = scheduleStringFormatter(slotInfo.end);

          setClickedSpan(`${formattedStart} ${formattedEnd}`);
        }}
        onSelectEvent={(event) => {
          if (blockInteraction) return;
          setSlideType(Slide.Edit);
          setTimeout(() => setCrudOpen(true), 0);
          setClickedSchedule({
            title: event.title,
            startAt: DateTime.fromJSDate(event.startAt).toFormat("yyyy-MM-dd'T'HH:mm:ss"),
            endAt: DateTime.fromJSDate(event.endAt).toFormat("yyyy-MM-dd'T'HH:mm:ss"),
            recurrence: event.recurrence,
            eventId: event.eventId,
          });
          setClickedSpan(
            `${scheduleStringFormatter(event.startAt)} ${scheduleStringFormatter(event.endAt)}`
          );
        }}
      />
      {portal}
    </>
  );
};

export default WeeklyCalendar;
