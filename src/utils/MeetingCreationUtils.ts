// 서버 쪽 api 포맷에 맞추기 위해 사용자 입력 데이터들을 파싱하는 메서드들

import { parse } from "date-fns";

export const projectDataParse = (project: string) => {
  if (!project) return null;
  const index = project.indexOf(" ");
  return project.slice(0, index);
};

// duration은 숫자로 파싱하면서 총 "분"으로 변환
export const durationMinutesParse = (durationMinutes: string) => {
  const parsedDate = parse(durationMinutes, "HH:mm", new Date());
  return parsedDate.getHours() * 60 + parsedDate.getMinutes();
};

export const deadlineParse = (deadline: string) => {
  if (!deadline) return null;
  if (!deadline.includes("T")) return null;
  const [date, time] = deadline?.split("T");
  const [hour, minute] = time?.split(":");
  const paddedTime = hour?.padStart(2, "0") + ":" + minute;
  return date + "T" + paddedTime;
};
