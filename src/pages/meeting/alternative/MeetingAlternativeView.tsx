import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventClickArg } from "@fullcalendar/core";
import styles from "./MeetingAlternativeView.module.scss";
import "./FullCalendar.scss";
import Button from "@/components/Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Loading from "@/components/Loading/Loading";
import Check from "@assets/check.svg?react";
import ReactDOM from "react-dom";
import { voteAlternativeMeeting } from "@/apis/meeting/meetingAPI";
import type { AlternativeMeeting } from "@/apis/meeting/meetingTypes";
import { useMeetingAlternative } from "@/hooks/useMeetingAlternative";
import { useNavigate } from "react-router-dom";

interface Props {
  alternativeTimes: AlternativeMeeting[];
  meetingId: string;
}

const MeetingAlternativeView = ({ alternativeTimes, meetingId }: Props) => {
  const { data, firstDate, duration, loading } = useMeetingAlternative(alternativeTimes);
  const [clickedEventNum, setClickedEventNum] = useState(null);
  const navigate = useNavigate();
  const [popupInfo, setPopupInfo] = useState<{
    top: number;
    left: number;
    title: string;
    content: string;
    lineY: number; // 점선 Y 좌표
    lineX: number; // 점선 시작 X
    lineW: number; // 점선 길이 (width)
  } | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null); // 스크롤시 위치참조를 위한 참조변수
  const popupRef = useRef<HTMLDivElement | null>(null); // 팝업 카드 DOM
  const eventRef = useRef<HTMLElement | null>(null); // 마지막으로 클릭한 이벤트 DOM

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!popupInfo) return; // 팝업이 없으면 무시
      const target = e.target as HTMLElement;

      // 팝업 내부 or 선택버튼 or 이벤트 블록이면 닫지 않음
      if (popupRef.current?.contains(target)) {
        return;
      }

      if (target.closest(".selectButton")) return;

      // 그 외 아무 곳이나 클릭 → 팝업 닫기
      setPopupInfo(null);
    }

    document.addEventListener("click", handleDocClick, true); // 캡처 단계
    return () => document.removeEventListener("click", handleDocClick, true);
  }, [popupInfo]);

  const handleButtonClick = (e) => {
    setClickedEventNum(e._def.extendedProps);
    setPopupInfo(null);
  };

  const handleEventClick = (arg: EventClickArg) => {
    // 이번에 클릭한 이벤트가 포함된 스크롤러를 즉시 찾는다
    const scroller = (arg.el as HTMLElement).closest(".fc-scroller") as HTMLDivElement;
    if (!scrollerRef.current) return;

    // 이벤트 블럭 기억
    eventRef.current = arg.el as HTMLElement;

    // 스크롤러를 팝업 포털 컨테이너로 사용
    scrollerRef.current = scroller;

    const eventRect = (arg.el as HTMLElement).getBoundingClientRect();
    const scrollRect = scrollerRef.current.getBoundingClientRect();

    const eventCenterY = eventRect.top + eventRect.height / 2; // 이벤트 중앙 Y (viewport)
    const eventRight = eventRect.right; // 이벤트 오른쪽 끝 X
    const failText =
      arg.event.extendedProps.failMembers.length !== 0
        ? ": " + arg.event.extendedProps.failMembers.join(", ") + " x"
        : "";

    setPopupInfo({
      top: eventCenterY - scrollRect.top + scroller.scrollTop,
      left: eventRect.right - scrollRect.left + 120,
      title: `${arg.event.extendedProps.date} ${arg.event.extendedProps.startTime} - ${arg.event.extendedProps.endTime}`,
      content: `참여자 ${arg.event.extendedProps.availableNum}/${arg.event.extendedProps.totalNum} 참여가능 ${failText}`,
      lineY: eventCenterY - scrollRect.top + scroller.scrollTop, // 점선 Y 고정
      lineX: eventRight - scrollRect.left, // 점선 시작 X (scroller 좌표)
      lineW: 120,
    });
  };

  const completeButtonClickHandler = async () => {
    if (!clickedEventNum) {
      alert("대안 시간을 하나 선정하세요!");
    } else {
      try {
        const data = {
          alternativeTime: `${clickedEventNum.date}T${clickedEventNum.startTime}`,
        };
        voteAlternativeMeeting(meetingId, data);
      } catch (error) {
        alert(error);
        return;
      }
    }

    navigate(`/meeting/detail`, {
      state: {
        meetingId: meetingId,
      },
    });
  };

  return (
    <div className={styles.meetingAlternativeView}>
      <div className={styles.meetingAlternativeView__header}>대안 시간을 투표해 주세요</div>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
      {!loading && firstDate && duration > 0 && data && (
        <div className={styles.meetingAlternativeView__body}>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="customTimeGrid"
            views={{
              customTimeGrid: {
                type: "timeGrid",
                duration: { days: duration },
              },
            }}
            initialDate={firstDate}
            events={data}
            eventClassNames={(arg) => {
              return arg.event._def.extendedProps.index === clickedEventNum?.index
                ? [styles.selectedEvent] // 선택된 대인시간만 클래스를 부여
                : [];
            }}
            eventContent={(arg) =>
              arg.event._def.extendedProps.index === clickedEventNum?.index ? (
                <Check className={styles.checkButton} />
              ) : (
                <button
                  className={`${styles.selectButton} selectButton`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(arg.event);
                  }}
                >
                  선택
                </button>
              )
            }
            eventClick={handleEventClick}
            datesSet={() => {
              if (!scrollerRef.current) {
                const s = document.querySelector(".fc .fc-scroller") as HTMLDivElement;
                if (s) {
                  scrollerRef.current = s;
                  s.style.position = "relative";
                }
              }
            }}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            height={600}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            }}
            allDaySlot={false}
            dayHeaderContent={(arg) => {
              const monthDay = format(arg.date, "M.d", { locale: ko });
              const weekday = format(arg.date, "eee", { locale: ko });
              return `${monthDay}(${weekday})`;
            }}
          />
          {popupInfo &&
            scrollerRef.current &&
            /* scrollerRef.current 안에 포털로 렌더 */
            ReactDOM.createPortal(
              <>
                <div
                  className={styles.dashedLine}
                  style={{
                    top: popupInfo.lineY,
                    left: popupInfo.lineX,
                    width: popupInfo.lineW,
                  }}
                />
                <div
                  ref={popupRef}
                  className={styles.popupCard}
                  style={{ top: popupInfo.top, left: popupInfo.left }}
                >
                  <div className={styles.popupCard__title}>{popupInfo.title}</div>
                  <div className={styles.popupCard__content}>{popupInfo.content}</div>
                </div>
              </>,
              scrollerRef.current
            )}
        </div>
      )}
      <Button
        label={"완료"}
        clickHandler={completeButtonClickHandler}
        className={clickedEventNum !== null ? styles.active : styles.inactive}
      />
    </div>
  );
};

export default MeetingAlternativeView;
