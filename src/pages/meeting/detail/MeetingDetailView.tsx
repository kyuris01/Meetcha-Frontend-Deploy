import styles from "./MeetingDetailView.module.scss";
import type { MeetingDataType, MeetingDetailType } from "@/types/meeting-data-type";
import MeetingDetailRow from "./MeetingDetailRow";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import People from "@assets/people-hollow.svg?react";
import MeetingStateCard from "./MeetingStateCard";
import MeetingInfoCard from "./MeetingInfoCard";
import { completedMeetingDateFormatter } from "@/utils/dateFormatter";

const MeetingDetailView = ({ data }: { data: MeetingDetailType }) => {
  console.log("data:", data);

  const dataArray = [
    {
      label: "미팅 시간",
      icon: <Calendar className={styles.icon} />,
      data:
        data?.status === "FAIL"
          ? "실패"
          : completedMeetingDateFormatter(data?.finalSchedule?.startAt, data?.durationMinutes),
    },
    {
      label: "진행 시간",
      icon: <Clock className={styles.icon} />,
      data: `${Math.floor(data?.durationMinutes / 60)}시간 ${data?.durationMinutes % 60}분`,
    },
  ];

  return (
    <div className={styles.meetingDetailView}>
      <div className={styles.meetingDetailView__infoContainer1}>
        <MeetingStateCard meeting_status={data.status} />
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
          data={data.participants}
        />
      </div>
    </div>
  );
};

export default MeetingDetailView;
