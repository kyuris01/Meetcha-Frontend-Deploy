import React, { useEffect, useRef, useState } from "react";
import styles from "./MeetingOptionCard.module.scss";
import DownArrow from "@assets/downArrow.svg?react";
import TextInputComponent from "./input_component/TextInputComponent";
import CalendarMultipleInputComponent from "./input_component/CalendarMultipleInputComponent";
import TimePicker from "../../../components/TimePicker/TimePicker";
import CalendarInputComponent from "./input_component/CalendarInputComponent";
import ProjectInputComponent from "./input_component/ProjectInputComponent/ProjectInputComponent";

interface Props {
  title: string;
  icon: React.ReactNode;
  data: string | string[];
  type: number;
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}

const MeetingOptionCard = ({ title, icon, data, type, dataSetter }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false); // 카드가 펼쳐졌는지 여부
  const contentRef = useRef<HTMLDivElement>(null); // 사용자 입력 컴포넌트 크기 영역 참조 변수
  let inputComponent = null; // 사용자 입력 방식에 따른 컴포넌트(input태그, 달력, ...)

  switch (type) {
    case 0:
      inputComponent = (
        <TextInputComponent
          dataSetter={dataSetter as React.Dispatch<React.SetStateAction<string>>}
        />
      );
      break;
    case 1:
      inputComponent = (
        <CalendarMultipleInputComponent
          dataSetter={dataSetter as React.Dispatch<React.SetStateAction<string[]>>}
        />
      );
      break;
    case 2:
      inputComponent = (
        <TimePicker
          onChange={(item) => {
            dataSetter(item);
          }}
          ampm={false}
          minRange={1}
        />
      );
      break;
    case 3:
      inputComponent = (
        <>
          <CalendarInputComponent
            dataSetter={dataSetter as React.Dispatch<React.SetStateAction<string>>}
          />
          <TimePicker
            onChange={(item) => {
              (dataSetter as React.Dispatch<React.SetStateAction<string>>)(
                (prev) => `${prev?.split("T")[0]}T${item}`
              );
            }}
            ampm={false}
            minRange={1}
          />
        </>
      );
      break;
    case 4:
      inputComponent = (
        <ProjectInputComponent
          dataSetter={dataSetter as React.Dispatch<React.SetStateAction<string>>}
        />
      );
  }

  // UI상의 데이터 표시를 위한 데이터 포맷 로직
  const formatData = (data: Props["data"]) => {
    if (Array.isArray(data)) {
      return data.join(", ");
    }
    if (typeof data === "string" && data.includes("T")) {
      const [date, time] = data?.split("T");
      return `${date} ${time}`;
    }
    if (type === 4) {
      const index = data.indexOf(" ");
      return data.slice(index);
    }
    return data;
  };

  // 카드의 높이를 구하는 로직(애니메이션 적용 위함)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      el.style.display = "inline";
      el.style.height = el.scrollHeight + "px"; // 펼침
    } else {
      el.style.height = "0px"; // 접힘
      el.style.display = "none";
    }
  }, [expanded]);

  return (
    <div
      className={
        expanded ? `${styles.expanded} ${styles.meetingOptionCard}` : styles.meetingOptionCard
      }
    >
      <div className={styles.meetingOptionCard__top} onClick={() => setExpanded((prev) => !prev)}>
        <div className={styles.meetingOptionCard__top__icon}>{icon}</div>
        <div className={styles.meetingOptionCard__top__data}>
          <div className={styles.meetingOptionCard__top__data__label}>{title}</div>
          <div className={styles.meetingOptionCard__top__data__value}>{formatData(data)}</div>
        </div>
        <div className={styles.meetingOptionCard__top__downArrow}>
          <DownArrow />
        </div>
      </div>

      <div ref={contentRef} className={styles.meetingOptionCard__content}>
        {inputComponent}
      </div>
    </div>
  );
};

export default MeetingOptionCard;
