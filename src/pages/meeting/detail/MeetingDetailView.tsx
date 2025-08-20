import styles from "./MeetingDetailView.module.scss";
import MeetingDetailRow from "./MeetingDetailRow";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import People from "@assets/people-hollow.svg?react";
import MeetingStateCard from "./MeetingStateCard";
import MeetingInfoCard from "./MeetingInfoCard";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";
import { scheduleStringFormatter } from "@/utils/dateFormatter";
import { isAfter } from "date-fns/isAfter";

const MeetingDetailView = ({ data }: { data: MeetingDetail }) => {
  const dataArray = [
    {
      label: "미팅 시간",
      icon: <Calendar className={styles.icon} />,
      data: isAfter(new Date(), data?.deadline)
        ? "실패"
        : data?.confirmedTime
        ? scheduleStringFormatter(data?.confirmedTime)
        : data?.confirmedTime,
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
        <MeetingStateCard data={data} />
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
