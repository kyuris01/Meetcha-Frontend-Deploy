import Button from "@/components/Button";
import { useContext, useEffect } from "react";
import styles from "./ScheduleCrudPage.module.scss";
import { createSchedule, deleteSchedule, editSchedule } from "@/apis/schedule/scheduleAPI";
import type { Schedule } from "@/apis/schedule/scheduleTypes";
import ScheduleCrudView from "./ScheduleCrudView";
import { ScheduleCreateFormContext, useScheduleCreateForm } from "./hooks/useScheduleCreateForm";
import { Slide, type SlideType } from "../weekly_schedule/WeeklyCalendar";
import type { Dispatch, SetStateAction } from "react";
import { ScheduleCrudContext } from "./hooks/useScheduleCrudContext";
import { DateContext } from "../DataContext";
import { useSchedules } from "@/hooks/useSchedules";

interface Props {
  clickedSpan: string;
  slideType: SlideType;
  setCrudOpen: Dispatch<SetStateAction<boolean>>;
  data?: Schedule; // 기존 일정 클릭시 얻을수있는 기존 일정 관련 데이터
}

const ScheduleCrudPage = ({ clickedSpan, slideType, data, setCrudOpen }: Props) => {
  const form = useScheduleCreateForm();
  const { year, month } = useContext(DateContext);
  const { forceRefresh } = useSchedules(year, month);

  useEffect(() => {
    if (slideType === Slide.Create) {
      return;
    }
    form.setFormValue("title", data?.title);
    form.setFormValue("recurrence", data?.recurrence);
  }, [slideType, data, form]);

  const sendCreationReq = () => {
    if (form.errors) {
      for (const [key, value] of Object.entries(form.errors)) {
        alert(`${key} ${value}`);
      }
      return;
    }

    form.onSubmit(async () => {
      await createSchedule(form.values);
      forceRefresh();
      setCrudOpen(false);
    });
  };

  const sendEditReq = () => {
    if (form.errors) {
      for (const [key, value] of Object.entries(form.errors)) {
        alert(`${key} ${value}`);
      }
      return;
    }

    form.onSubmit(async () => {
      await editSchedule({ ...form.values, eventId: data.eventId });
      forceRefresh();
      setCrudOpen(false);
    });
  };

  const sendDelReq = async () => {
    await deleteSchedule(data.eventId);
    forceRefresh();
    setCrudOpen(false);
  };

  return (
    <div className={styles.scheduleCrudPage}>
      <ScheduleCreateFormContext.Provider value={form}>
        <ScheduleCrudContext.Provider value={{ clickedSpan, slideType, data, setCrudOpen }}>
          <ScheduleCrudView />
        </ScheduleCrudContext.Provider>
      </ScheduleCreateFormContext.Provider>

      <div className={styles.scheduleCrudPage__buttonContainer}>
        {slideType === Slide.Edit && (
          <div className={styles.deleteButton} onClick={sendDelReq}>
            삭제하기
          </div>
        )}
        <Button
          className={styles.active}
          label={slideType === Slide.Create ? "일정 생성하기" : "수정완료"}
          clickHandler={slideType === Slide.Create ? sendCreationReq : sendEditReq}
        />
      </div>
    </div>
  );
};

export default ScheduleCrudPage;
