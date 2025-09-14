import Pencil from "@assets/pencil.svg?react";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import Watch from "@assets/watch.svg?react";

export const cardDataSet = [
  {
    id: 0,
    title: "미팅 설명",
    icon: <Pencil />,
    stateKey: "description",
  },
  {
    id: 1,
    title: "미팅 후보 날짜",
    icon: <Calendar />,
    stateKey: "candidateDates",
  },
  {
    id: 2,
    title: "미팅 진행 시간",
    icon: <Clock />,
    stateKey: "durationMinutes",
  },
  {
    id: 3,
    title: "투표 마감 시간",
    icon: <Watch />,
    stateKey: "deadline",
  },
  {
    id: 4,
    title: "프로젝트",
    icon: <Watch />,
    stateKey: "project",
  },
];
