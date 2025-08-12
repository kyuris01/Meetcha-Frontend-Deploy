import { colorAutoSelector } from "@/utils/colorAutoSelector";
import CustomWeekHeader from "./CustomWeekHeader";
import { CustomEvent } from "./CustomEvent";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScheduleCreationPage from "../schedule_creation/ScheduleCreationPage";
import { format } from "date-fns/format";
import { ko } from "date-fns/locale";
import type { ScheduleDataType } from "@/types/schedule-data-type";
import { scheduleStringFormatter } from "@/utils/dateFormatter";

interface Props {
  week: Date;
  events: any[];
  blockInteraction: boolean;
}

const localizer = luxonLocalizer(DateTime);

const formats = {
  timeGutterFormat: (date: Date, culture: string, localizer: any) => {
    return DateTime.fromJSDate(date).toFormat("H"); // 예: 22
  },
};

const WeeklyCalendar = ({ week, events, blockInteraction }: Props) => {
  const [creationOpen, setCreationOpen] = useState<boolean>(false);
  const [clickedSpan, setClickedSpan] = useState<string>();
  const [clickedSchedule, setClickedSchedule] = useState<ScheduleDataType>();
  const [mode, setMode] = useState<boolean>(true); // 생성모드 or 수정모드

  const portal = ReactDOM.createPortal(
    <AnimatePresence>
      {creationOpen && (
        <>
          {/* 1) 백드롭: 클릭 시 닫기 */}
          <motion.div key="backdrop" className="backdrop" onClick={() => setCreationOpen(false)} />

          {/* 2) 슬라이드업 패널: 클릭 이벤트 전파 차단 */}
          <motion.div
            key="panel"
            className="slideUpContainer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragDirectionLock={true}
            dragConstraints={{ top: 0, bottom: 1000 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > window.innerHeight * 0.2) {
                setCreationOpen(false);
              }
            }}
          >
            <ScheduleCreationPage
              clickedSpan={clickedSpan}
              createMode={mode}
              data={clickedSchedule}
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
        events={events}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
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
              backgroundColor: `${colorAutoSelector(event.id)}`,
              borderRadius: "6px",
              color: "white",
            },
          };
        }}
        selectable={true}
        step={30} // ✅ 각 시간 슬롯 간격 (분 단위)
        timeslots={2} // ✅ 한 시간당 몇 개의 슬롯
        longPressThreshold={750}
        onSelecting={() => !blockInteraction}
        onSelectSlot={(slotInfo) => {
          if (blockInteraction) return;
          setTimeout(() => setCreationOpen(true), 0);
          // console.log("빈 영역 클릭됨:", slotInfo);
          const formattedStart = scheduleStringFormatter(slotInfo.start);
          const formattedEnd = scheduleStringFormatter(slotInfo.end);

          setClickedSpan(`${formattedStart} ${formattedEnd}`);
        }}
        onSelectEvent={(event) => {
          if (blockInteraction) return;
          setMode(false);
          setTimeout(() => setCreationOpen(true), 0);
          // console.log("일정 클릭됨:", event);
          setClickedSchedule({
            title: event.title,
            startAt: event.start,
            endAt: event.end,
            recurrence: event.recur,
            eventId: event.id,
          });
          setClickedSpan(
            `${scheduleStringFormatter(event.start)} ${scheduleStringFormatter(event.end)}`
          );
        }}
      />
      {portal}
    </>
  );
};

export default WeeklyCalendar;
