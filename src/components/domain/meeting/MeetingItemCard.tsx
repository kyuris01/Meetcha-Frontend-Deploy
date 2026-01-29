import { useRef, useMemo } from "react";
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
import { useMeetingItemSwiperController } from "@/hooks/useMeetingItemSwiperController";

interface Props {
  data: Meeting;
}

const MeetingItemCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const currentStatus: string = data.meetingStatus;
  const isMatchFailed: boolean = currentStatus === "MATCH_FAILED";

  const { onPointerDown, onPointerMove, onPointerUp, dragging, tx, open } =
    useMeetingItemSwiperController(data.meetingId, isMatchFailed);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

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
        <button
          className={styles.meetingItemCard__delete}
          onClick={handleDeleteBtn}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <img src={trashCan} alt="쓰레기통"></img>
        </button>
      ) : null}
    </div>
  );
};

export default MeetingItemCard;
