import { useEffect, useState } from "react";
import styles from "./MeetingItemCard.module.scss";
import type { MeetingDataType } from "@/types/meeting-data-type";
import { useNavigate } from "react-router-dom";

interface Props {
  data: MeetingDataType;
}

const MeetingItemCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<string>("");
  const [cardStyle, setCardStyle] = useState<string>();

  const handleClick = () => {
    navigate("detail", { state: data });
  };

  const cardInfoResolver = () => {
    switch (data.meeting_status) {
      case "실패":
        setMeetingDetail("매칭 실패");
        setCardStyle(styles.fail);
        break;
      case "생성중":
        setMeetingDetail(`${data.deadline} 종료`);
        setCardStyle(styles.incomplete);
        break;
      case "진행중":
        setMeetingDetail(data.confirmed_time);
        setCardStyle(styles.success);
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
          <div className={styles.meetingItemCard__dataArea__meetingInfo__meetingDetail}>
            {meetingDetail}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingItemCard;
