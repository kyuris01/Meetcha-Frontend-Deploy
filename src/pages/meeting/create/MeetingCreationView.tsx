import React from "react";
import styles from "./MeetingCreationView.module.scss";
import { durationOptions } from "./constants/MeetingCreation.constants";
import { useMeetingCreateFormContext } from "./hooks/useMeetingCreateForm";
import { Accordion } from "@radix-ui/react-accordion";
import Pencil from "@assets/pencil.svg?react";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import Watch from "@assets/watch.svg?react";
// 아이콘 이름이 아이콘? 일단 피그마엔 그렇게 적힘
import Icon from "@assets/icon.svg?react";
import type { MeetingCreationSchema } from "./schemas/meetingCreationSchema";
import { MeetingAccordionItem } from "./MeetingAccordionItem";
import { MultiSelectCalendar } from "./input_component/MultiSelectCalendar";
import { DurationSelect } from "./input_component/DurationSelect";
import { DateTimePicker } from "./input_component/DateTimePicker";
import dayjs from "dayjs";
import { ProjectSetter } from "./input_component/ProjectSetter";

const fieldNames: Record<keyof MeetingCreationSchema, keyof MeetingCreationSchema> = {
  title: "title",
  description: "description",
  candidateDates: "candidateDates",
  durationMinutes: "durationMinutes",
  deadline: "deadline",
  projectId: "projectId",
} as const;

const MeetingCreationView = () => {
  const form = useMeetingCreateFormContext();

  return (
    <div className={styles.meetingCreationView}>
      <input
        className={styles.meetingCreationView__inputTag}
        type="text"
        placeholder="미팅 제목을 적어주세요"
        onChange={(e) => {
          form.setFormValue("title", e.target.value);
        }}
        autoFocus
      />
      <Accordion type="single" collapsible className={styles.accordionContainer}>
        <MeetingAccordionItem
          triggerContent={{
            Icon: Pencil,
            title: "미팅 설명",
            value: form.getFormValue("description") || "-",
          }}
          formInputComponent={
            <textarea
              style={{
                width: "100%",
                height: "4rem",
                padding: "5px",
                border: "none",
                outline: "none",
                fontFamily: "Pretendard",
                resize: "none",
              }}
              value={form.getFormValue("description") || ""}
              onChange={(e) => {
                form.setFormValue("description", e.target.value);
              }}
            />
          }
          fieldName={fieldNames.description}
        />
        <MeetingAccordionItem
          triggerContent={{
            Icon: Calendar,
            title: "미팅 후보 날짜",
            value:
              form.getFormValue("candidateDates").length > 0
                ? form
                    .getFormValue("candidateDates")
                    .map((date) => dayjs(date).format("YYYY년 MM월 DD일"))
                : "선택해주세요",
          }}
          formInputComponent={<MultiSelectCalendar />}
          fieldName={fieldNames.candidateDates}
          required
        />
        <MeetingAccordionItem
          triggerContent={{
            Icon: Clock,
            title: "미팅 진행 시간",
            value:
              durationOptions.find(
                (option) => option.value === form.getFormValue("durationMinutes")
              )?.label || "선택해주세요",
          }}
          formInputComponent={<DurationSelect />}
          fieldName={fieldNames.durationMinutes}
          required
        />
        <MeetingAccordionItem
          triggerContent={{
            Icon: Watch,
            title: "투표 마감 시간",
            value: form.getFormValue("deadline")
              ? dayjs(form.getFormValue("deadline")).format("YYYY년 MM월 DD일 HH시 mm분")
              : "선택해주세요",
          }}
          formInputComponent={<DateTimePicker />}
          fieldName={fieldNames.deadline}
          required
        />
        <MeetingAccordionItem
          triggerContent={{
            Icon: Icon,
            title: "프로젝트",
            value: form.getFormValue("projectId") ? "선택 완료" : "선택해주세요",
          }}
          formInputComponent={<ProjectSetter />}
          fieldName={fieldNames.projectId}
        />
      </Accordion>
    </div>
  );
};

export default MeetingCreationView;
