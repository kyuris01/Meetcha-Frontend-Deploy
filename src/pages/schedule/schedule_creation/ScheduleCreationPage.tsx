import Button from "@/components/Button";
import { useEffect, useState } from "react";
import styles from "./ScheduleCreationPage.module.scss";
import ScheduleCreationView from "./ScheduleCreationView";
import { apiCall } from "@/utils/apiCall";
import type { ScheduleDataType } from "@/types/schedule-data-type";
import { scheduleStringFormatter } from "@/utils/dateFormatter";

interface Props {
  clickedSpan: string;
  createMode: boolean; // true -> create mode, false -> edit mode
  data?: ScheduleDataType;
}

const eventId = 3;
const CREATE_PATH = `/schedule-create`;
const EDIT_PATH = `/user/schedule/update`;
const DEL_PATH = `/user/schedule/delete?eventId=${eventId}`;

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
    console.log("1: ", scheduleTitle);
    console.log("2: ", scheduleTime);
    console.log("3: ", repetition);
    if (scheduleTitle && scheduleTime && repetition) setAllDataReserved(true);
  }, [scheduleTitle, scheduleTime, repetition]);

  const sendCreationReq = async () => {
    if (!allDataReserved) return;
    const data = {
      scheduleTitle: scheduleTitle,
      scheduleTime: scheduleTime,
      repetition: repetition,
    };
    const response = await apiCall(CREATE_PATH, "POST", data, true);

    switch (response.code) {
      case 201:
        alert("일정 생성이 완료되었습니다");
        break;
      default:
        alert("오류가 발생하였습니다.. 잠시후 다시 시도해주세요");
    }
  };

  const sendEditReq = async () => {
    if (!allDataReserved) return;
    const data = {
      scheduleTitle: scheduleTitle,
      scheduleTime: scheduleTime,
      repetition: repetition,
    };
    const response = await apiCall(EDIT_PATH, "PUT", data, true);

    switch (response.code) {
      case 200:
        alert("일정을 수정하였습니다!");
        break;
      case 401:
        alert("로그인이 필요합니다!");
        break;
      case 404:
        alert("사용자를 찾을 수 없습니다");
        break;
      default:
        alert("오류가 발생하였습니다.. 잠시후 다시 시도해주세요");
    }
  };

  const sendDelReq = async () => {
    const response = await apiCall(DEL_PATH, "DELETE", null, true);

    switch (response.code) {
      case 200:
        alert("일정을 삭제하였습니다!");
        break;
      case 401:
        alert("로그인이 필요합니다!");
        break;
      case 404:
        alert("사용자를 찾을 수 없습니다");
        break;
      default:
        alert("오류가 발생하였습니다.. 잠시후 다시 시도해주세요");
    }
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
          label={createMode ? "미팅 생성하기" : "완료"}
          clickHandler={createMode ? sendCreationReq : sendEditReq}
        />
      </div>
    </div>
  );
};

export default ScheduleCreationPage;
