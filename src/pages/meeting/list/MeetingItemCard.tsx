import { useEffect, useState, useRef, useMemo } from "react";
import styles from "./MeetingItemCard.module.scss";
import { useNavigate } from "react-router-dom";
import {
  completedMeetingDateFormatter,
  incompletedMeetingDateFormatter,
} from "@/utils/dateFormatter";
import type { Meeting } from "@/apis/meeting/meetingTypes";
import { deleteMeeting } from "@/apis/meeting/meetingAPI";

import trashCan from "@assets/trashCan.svg";
import { useMeetingStore } from "@/store/meetingStore";

interface Props {
  data: Meeting;
}

const DelBtnWidth = 72;
const OPEN_THRESHOLD = 0.5;
const MOVE_THRESHOLD = 6;

const MeetingItemCard = ({ data }: Props) => {
  const currentStatus: string = data.meetingStatus;

  const isMatchFailed: boolean = currentStatus === "MATCH_FAILED";

  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false); //스와이프가 진행중인지 여부
  const [tx, setTx] = useState<number>(0); //카드의 X축 이동 픽셀값

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const movedRef = useRef(false); //드래그가 발생했는지
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

  // useMouseEvent({ open, setOpen, targetRef });

  const handleClick = () => {
    navigate("detail", {
      state: {
        meetingId: data.meetingId,
      },
    });
  };

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  const view = useMemo(() => {
    if (currentStatus === "MATCHING") {
      return {
        meetingDetail: `${incompletedMeetingDateFormatter(data.deadline)} 종료`,
        cardStyle: styles.incomplete,
        textStyle: styles.incompleteText,
      };
    }
    if (currentStatus === "MATCH_FAILED") {
      return {
        meetingDetail: "매칭 실패",
        cardStyle: styles.fail,
        textStyle: styles.failText,
      };
    }
    return {
      meetingDetail: `${completedMeetingDateFormatter(data.confirmedTime, data.durationMinutes)}`,
      cardStyle: styles.success,
      textStyle: undefined,
    };
  }, [currentStatus, data.deadline, data.confirmedTime, data.durationMinutes]);

  useEffect(() => {
    setTx(open ? -DelBtnWidth : 0);
  }, [open]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    movedRef.current = false;

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;

    // 드래그 캡처, 드래그가 시작된 이후, 커서가 요소 밖으로 나가더라도 pointermove/pointer up 이벤트를 계속 이요소가 받게 하려는 기능
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (Math.abs(dx) > MOVE_THRESHOLD || Math.abs(dy) > MOVE_THRESHOLD) {
      movedRef.current = true;
    } else {
      return;
    }

    if (Math.abs(dx) < Math.abs(dy)) return; // 커서의 수평이동량이 더 많을 경우에만 슬라이드

    // 왼쪽 스와이프만 허용(컨텐츠를 왼쪽으로 보내 버튼 노출)
    const next = clamp(dx + (open ? -DelBtnWidth : 0), -DelBtnWidth, 0);
    if (isMatchFailed) setTx(next);

    // 스와이프 중 화면이 스크롤 되는것을 막아준다.
    e.preventDefault();
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    const opened = Math.abs(tx) >= DelBtnWidth * OPEN_THRESHOLD;
    setOpen(opened);

    if (!movedRef.current && !opened) {
      handleClick();
    }

    movedRef.current = false;
  };

  const handleDeleteBtn = async () => {
    try {
      if (await deleteMeeting(data.meetingId)) {
        alert("삭제에 성공했습니다!");
        fetchMeetings();
      }
      navigate("/meeting");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      ref={targetRef}
      data-status={data.meetingStatus}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={styles.meetingItemCardWithDelete}
    >
      <div
        className={styles.swipeTrack}
        style={{
          transform: `translateX(${tx}px)`,
          transition: dragging ? "none" : "transform 160ms ease",
        }}
      >
        <div className={styles.meetingItemCard}>
          <div className={`${styles.meetingItemCard__leftEdge} ${view.cardStyle}`}></div>
          <div className={styles.meetingItemCard__dataArea}>
            <div className={styles.meetingItemCard__dataArea__meetingInfo}>
              <div className={styles.meetingItemCard__dataArea__meetingInfo__meetingName}>
                {data.title}
              </div>
              <div
                className={`${styles.meetingItemCard__dataArea__meetingInfo__meetingDetail} ${view.textStyle}`}
              >
                {view.meetingDetail}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMatchFailed && open ? (
        <button className={styles.meetingItemCard__delete} onClick={handleDeleteBtn}>
          <img src={trashCan} alt="쓰레기통"></img>
        </button>
      ) : null}
    </div>
  );
};

export default MeetingItemCard;
