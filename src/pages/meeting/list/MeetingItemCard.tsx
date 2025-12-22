import { useEffect, useState, useRef } from "react";
import styles from "./MeetingItemCard.module.scss";
import { useNavigate } from "react-router-dom";
import {
  completedMeetingDateFormatter,
  incompletedMeetingDateFormatter,
} from "@/utils/dateFormatter";
import type { Meeting } from "@/apis/meeting/meetingTypes";
import { deleteMeeting } from "@/apis/meeting/meetingAPI";

import { useMouseEvent } from "../create/hooks/useHandleMouseEvent";

import trashCan from "@assets/trashCan.svg";

interface Props {
  data: Meeting;
}

const DelBtnWidth = 72;
const OPEN_THRESHOLD = 0.5;

const MeetingItemCard = ({ data }: Props) => {
  const currentStatus: string = data.meetingStatus;

  const isMatchFailed: boolean = currentStatus === "MATCH_FAILED";

  const navigate = useNavigate();

  const [meetingDetail, setMeetingDetail] = useState<string>("");
  const [cardStyle, setCardStyle] = useState<string>();
  const [textStyle, setTextStyle] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false); //스와이프가 진행중인지 여부
  const [tx, setTx] = useState<number>(0); //카드의 X축 이동 픽셀값

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const movedRef = useRef(false); //드래그가 발생했는지
  const targetRef = useRef<HTMLDivElement | null>(null);

  useMouseEvent({ open, setOpen, targetRef });

  const handleClick = () => {
    navigate("detail", {
      state: {
        meetingId: data.meetingId,
      },
    });
  };

  //형코드
  const cardInfoResolver = () => {
    if (currentStatus === "MATCHING") {
      setMeetingDetail(`${incompletedMeetingDateFormatter(data.deadline)} 종료`);
      setCardStyle(styles.incomplete);
      setTextStyle(styles.incompleteText);
    } else if (currentStatus === "MATCH_FAILED") {
      setMeetingDetail("매칭 실패");
      setCardStyle(styles.fail);
      setTextStyle(styles.failText);
    } else {
      setMeetingDetail(
        `${completedMeetingDateFormatter(data.confirmedTime, data.durationMinutes)}`
      );
      setCardStyle(styles.success);
    }
  };

  useEffect(() => {
    cardInfoResolver();
  }, [data]);
  //형코드
  useEffect(() => {
    setTx(open ? -DelBtnWidth : 0);
  }, [open]);
  //범위 제한 유틸함수
  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  //MeetingItemCard에 클릭했을 때의 동작
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMatchFailed) return; // 매칭중일 때만 슬라이드 허용
    setDragging(true);
    movedRef.current = false;

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;

    // 드래그 캡처, 드래그가 시작된 이후, 커서가 요소 밖으로 나가더라도 pointermove/pointer up 이벤트를 계속 이요소가 받게 하려는 기능
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  //드래그 했을 때 동작
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // 수평 우세 시에만 슬라이드
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    if (Math.abs(dx) < Math.abs(dy)) return;

    movedRef.current = true;

    // 왼쪽 스와이프만 허용(컨텐츠를 왼쪽으로 보내 버튼 노출)
    const next = clamp(dx + (open ? -DelBtnWidth : 0), -DelBtnWidth, 0);
    setTx(next);

    // 스와이프 중 화면이 스크롤 되는것을 막아준다.
    e.preventDefault();
  };
  //드래그 종료
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    const opened = Math.abs(tx) >= DelBtnWidth * OPEN_THRESHOLD;
    setOpen(opened);
    setTx(opened ? -DelBtnWidth : 0);

    if (!movedRef.current && !opened) {
      handleClick();
    }

    movedRef.current = false;
  };

  const handleDeleteBtn = async () => {
    try {
      const res = await deleteMeeting(data.meetingId);
      navigate("/meeting");
      console.log(res);
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
      onClick={() => {
        if (!isMatchFailed) {
          handleClick();
        }
      }}
    >
      <div
        className={styles.swipeTrack}
        style={{
          transform: `translateX(${tx}px)`,
          transition: dragging ? "none" : "transform 160ms ease",
        }}
      >
        <div className={styles.meetingItemCard}>
          <div className={`${styles.meetingItemCard__leftEdge} ${cardStyle}`}></div>
          <div className={styles.meetingItemCard__dataArea}>
            <div className={styles.meetingItemCard__dataArea__meetingInfo}>
              <div className={styles.meetingItemCard__dataArea__meetingInfo__meetingName}>
                {data.title}
              </div>
              <div
                className={`${styles.meetingItemCard__dataArea__meetingInfo__meetingDetail} ${textStyle}`}
              >
                {meetingDetail}
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
