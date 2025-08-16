import React, { useEffect, useState } from "react";
import styles from "./ScheduleCreationView.module.scss";
import Clock from "@assets/clock.svg?react";
import Pencil from "@assets/pencil.svg?react";
import TimePicker from "@/components/TimePicker/TimePicker";
import ScheduleCreationCard from "./ScheduleCreationCard";
import ScheduleRepetitionRow from "./ScheduleRepetitionRow";
import ScheduleDurationRow from "./ScheduleDurationRow";

interface Props {
  clickedSpan: string;
  scheduleTitle: string;
  scheduleTime: string;
  repetition: string;
  setScheduleTitle: React.Dispatch<React.SetStateAction<string>>;
  setScheduleTime: React.Dispatch<React.SetStateAction<string>>;
  setRepetition: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleCreationView = ({
  clickedSpan,
  scheduleTitle,
  scheduleTime,
  repetition,
  setScheduleTitle,
  setScheduleTime,
  setRepetition,
}: Props) => {
  const cardDataSet = [
    {
      id: 0,
      icon: <Clock />,
      expand: true,
      expandComponent: TimePicker,
      basicComponent: ScheduleDurationRow,
      basicProps: {
        clickedSpan,
        dataSetter: setScheduleTime,
      },
      data: scheduleTime,
      dataSetter: setScheduleTime,
    },
    // {
    //   id: 1,
    //   icon: <Pencil />,
    //   expand: false,
    //   expandedComponent: null,
    //   basicComponent: ScheduleRepetitionRow,
    //   basicProps: {
    //     data: repetition,
    //     dataSetter: setRepetition,
    //   },
    //   data: repetition,
    //   dataSetter: setRepetition,
    // },
  ];

  useEffect(() => {
    console.log(scheduleTitle);
  }, [scheduleTitle]);

  return (
    <div className={styles.scheduleCreationView}>
      <input
        className={styles.scheduleCreationView__inputTag}
        type="text"
        placeholder="일정 제목"
        value={scheduleTitle}
        onChange={(e) => {
          setScheduleTitle(e.target.value);
        }}
      />
      <div className={styles.scheduleCreationView__scheduleOptionContainer}>
        {cardDataSet.map((item, _) => (
          <ScheduleCreationCard
            key={item.id}
            icon={item.icon}
            expand={item.expand}
            data={item.data}
            dataSetter={item.dataSetter}
            BasicComponent={item.basicComponent}
            basicProps={item.basicProps}
            ExpandedComponent={item.expandComponent}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleCreationView;
