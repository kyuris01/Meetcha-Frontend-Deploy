import styles from "./MeetingDetailView.module.scss";
import type { MeetingDataType } from "@/types/meeting-data-type";
import MeetingDetailRow from "./MeetingDetailRow";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import People from "@assets/people-hollow.svg?react";
import MeetingStateCard from "./MeetingStateCard";
import MeetingInfoCard from "./MeetingInfoCard";

interface Props {
  data: MeetingDataType;
}

const MeetingDetailView = ({ data }: Props) => {
  const dataArray = [
    {
      label: "미팅 시간",
      icon: <Calendar className={styles.icon} />,
      data: data.confirmed_time,
    },
    {
      label: "진행 시간",
      icon: <Clock className={styles.icon} />,
      data: data.duration_minutes,
    },
  ];

  return (
    <div className={styles.meetingDetailView}>
      <div className={styles.meetingDetailView__infoContainer1}>
        <MeetingStateCard meeting_status={data.meeting_status} />
        <MeetingInfoCard title={data.title} desc={data.description} />
      </div>
      <div className={styles.meetingDetailView__infoContainer2}>
        {dataArray.map((item, index) => (
          <MeetingDetailRow label={item.label} icon={item.icon} data={item.data} key={index} />
        ))}
      </div>
      <div className={styles.meetingDetailView__infoContainer2}>
        <MeetingDetailRow
          label={"참여자 정보 확인"}
          icon={<People className={styles.icon} />}
          data={data.meeting_id}
        />
      </div>
    </div>
  );
};

export default MeetingDetailView;
