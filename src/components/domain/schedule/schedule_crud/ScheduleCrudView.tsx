import styles from "./ScheduleCrudView.module.scss";
import Repeat from "@assets/repeat.svg?react";
import ScheduleRepetitionRow from "./ScheduleRepetitionRow";
import ScheduleCrudCardExpandable from "./ScheduleCrudCardExpandable";
import ScheduleCrudCard from "./ScheduleCrudCard";
import { useScheduleCreateFormContext } from "../../../../hooks/schedule/schedule_crud/useScheduleCreateForm";
import { Slide } from "../weekly_schedule/WeeklyCalendar";
import { useScheduleCrudContext } from "../../../../hooks/schedule/schedule_crud/useScheduleCrudContext";

const ScheduleCrudView = () => {
  const form = useScheduleCreateFormContext();
  const scheduleCrudContext = useScheduleCrudContext();

  return (
    <div className={styles.scheduleCrudView}>
      <input
        className={styles.scheduleCrudView__inputTag}
        type="text"
        placeholder={
          scheduleCrudContext.slideType === Slide.Create ? "일정 제목" : form.getFormValue("title")
        }
        value={form.getFormValue("title")}
        onChange={(e) => {
          form.setFormValue("title", e.target.value);
        }}
      />
      <div className={styles.scheduleCrudView__scheduleOptionContainer}>
        <ScheduleCrudCardExpandable clickedSpan={scheduleCrudContext.clickedSpan} />
        <ScheduleCrudCard
          icon={<Repeat />}
          content={<ScheduleRepetitionRow />}
          type={"recurrence"}
        />
      </div>
    </div>
  );
};

export default ScheduleCrudView;
