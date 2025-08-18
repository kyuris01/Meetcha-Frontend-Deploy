import Button from "@/components/Button";
import { useEffect, useState } from "react";
import styles from "./ScheduleCreationPage.module.scss";
import ScheduleCreationView from "./ScheduleCreationView";
import { scheduleStringFormatter } from "@/utils/dateFormatter";
import { createSchedule, deleteSchedule, editSchedule } from "@/apis/schedule/scheduleAPI";
import type { Schedule } from "@/apis/schedule/scheduleTypes";

interface Props {
  clickedSpan: string;
  createMode: boolean; // true -> create mode, false -> edit mode
  data?: Schedule;
}

const ScheduleCreationPage = ({ clickedSpan, createMode, data }: Props) => {
  const [allDataReserved, setAllDataReserved] = useState<boolean>(false);
  const [scheduleTitle, setScheduleTitle] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>();
  const [repetition, setRepetition] = useState<string>();

  useEffect(() => {
    if (!createMode && data) {
      setScheduleTitle(data?.title);
      setScheduleTime(
        `${scheduleStringFormatter(data?.startAt)} ${scheduleStringFormatter(data?.endAt)}`
      );
    }
  }, []);

  const parseScheduleTime = (scheduleTime) => {
    // 서버 요구 형식에 맞게 데이터 파싱
    const scheduleArr = scheduleTime.split(" ");
    const data = {
      title: scheduleTitle,
      startAt: `${scheduleArr[0].slice(0, -1)}-${scheduleArr[1].slice(
        0,
        -1
      )}-${scheduleArr[2].slice(0, -4)}T${scheduleArr[4]}:00`,
      endAt: `${scheduleArr[5].slice(0, -1)}-${scheduleArr[6].slice(0, -1)}-${scheduleArr[7].slice(
        0,
        -4
      )}T${scheduleArr[9]}:00`,
      recurrence: repetition,
    };
    return data;
  };

  useEffect(() => {
    if (scheduleTitle && scheduleTime) setAllDataReserved(true);
  }, [scheduleTitle, scheduleTime, repetition]);

  const sendCreationReq = async () => {
    if (!allDataReserved) return;

    await createSchedule(parseScheduleTime(scheduleTime));
  };

  const sendEditReq = async () => {
    if (!allDataReserved) return;
    await editSchedule(parseScheduleTime(scheduleTime));
  };

  const sendDelReq = async () => {
    await deleteSchedule(data.eventId);
  };

  return (
    <div className={styles.scheduleCreationPage}>
      <ScheduleCreationView
        clickedSpan={clickedSpan}
        scheduleTitle={scheduleTitle}
        scheduleTime={scheduleTime}
        repetition={repetition}
        setScheduleTitle={setScheduleTitle}
        setScheduleTime={setScheduleTime}
        setRepetition={setRepetition}
      />
      <div className={styles.scheduleCreationPage__buttonContainer}>
        {!createMode && (
          <div className={styles.deleteButton} onClick={sendDelReq}>
            삭제하기
          </div>
        )}
        <Button
          className={allDataReserved ? styles.active : styles.inactive}
          label={createMode ? "일정 생성하기" : "완료"}
          clickHandler={createMode ? sendCreationReq : sendEditReq}
        />
      </div>
    </div>
  );
};

export default ScheduleCreationPage;
