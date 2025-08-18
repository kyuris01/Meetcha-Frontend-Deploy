import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";

// ex) 2025-08-02
export const dateFormatter = (input) => {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const scheduleStringFormatter = (input) => {
  const formattedDate = format(input, "yyyy년 MM월 dd일(EEE)", { locale: ko });
  const formattedTime = format(input, "a hh:mm").replace("AM", "오전").replace("PM", "오후");
  return `${formattedDate} ${formattedTime}`;
};

export const incompletedMeetingDateFormatter = (input) => {
  const formattedDate = format(input, "MM월 dd일(EEE)", { locale: ko });
  const formattedTime = format(input, "hh:mm");
  return `${formattedDate} ${formattedTime}`;
};

export const completedMeetingDateFormatter = (date, duration) => {
  const endDate = addHours(date, duration / 60);
  const formattedDate = format(date, "MM월 dd일(EEE)", { locale: ko });
  const startTime = format(date, "hh:mm");
  const endTime = format(endDate, "hh:mm");
  return `${formattedDate} ${startTime} ~ ${endTime}`;
};
