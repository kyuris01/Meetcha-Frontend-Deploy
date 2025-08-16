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

  useEffect(() => {
    if (scheduleTitle && scheduleTime) setAllDataReserved(true);
  }, [scheduleTitle, scheduleTime, repetition]);

  const sendCreationReq = async () => {
    if (!allDataReserved) return;
    const data = {
      scheduleTitle: scheduleTitle,
      scheduleTime: scheduleTime,
      repetition: repetition,
    };
    await createSchedule(data);
  };

  const sendEditReq = async () => {
    if (!allDataReserved) return;
    const data = {
      scheduleTitle: scheduleTitle,
      scheduleTime: scheduleTime,
      repetition: repetition,
    };
    await editSchedule(data);
  };

  const sendDelReq = async () => {
    const scheduleId = "abc"; // 추후 실제 일정 id로 수정요망
    await deleteSchedule(scheduleId);
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
