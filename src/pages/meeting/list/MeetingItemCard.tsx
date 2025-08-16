import { useEffect, useState } from "react";
import styles from "./MeetingItemCard.module.scss";
import { useNavigate } from "react-router-dom";
import {
  completedMeetingDateFormatter,
  incompletedMeetingDateFormatter,
} from "@/utils/dateFormatter";
import type { Meeting } from "@/apis/meeting/meetingTypes";

interface Props {
  data: Meeting;
}

const MeetingItemCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<string>("");
  const [cardStyle, setCardStyle] = useState<string>();
  const [textStyle, setTextStyle] = useState<string>();

  const handleClick = () => {
    navigate("detail", { state: data.meetingId });
  };

  const cardInfoResolver = () => {
    switch (data.meetingStatus) {
      case "MATCH_FAILED":
        setMeetingDetail("매칭 실패");
        setCardStyle(styles.fail);
        setTextStyle(styles.failText);
        break;
      case "DONE":
        setMeetingDetail(
          `${completedMeetingDateFormatter(data.confirmedTime, data.durationMinutes)}`
        );
        setCardStyle(styles.success);
        break;
      case "MATCHING":
        setMeetingDetail(`${incompletedMeetingDateFormatter(data.deadline)} 종료`);
        setCardStyle(styles.incomplete);
        setTextStyle(styles.incompleteText);
    }
  };

  useEffect(() => {
    cardInfoResolver();
  }, [data]);

  return (
    <div className={styles.meetingItemCard} onClick={handleClick}>
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
  );
};

export default MeetingItemCard;
