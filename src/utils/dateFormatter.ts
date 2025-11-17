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
  const formattedTime = format(input, "hh:mm a");
  return `${formattedDate} ${formattedTime}`;
};

export const completedMeetingDateFormatter = (date, duration) => {
  const endDate = addHours(date, duration / 60);
  const formattedDate = format(date, "MM월 dd일(EEE)", { locale: ko });
  const startTime = format(date, "hh:mm");
  const endTime = format(endDate, "hh:mm");
  return `${formattedDate} ${startTime} ~ ${endTime}`;
};

/**
 * "2025년 11월 17일(월) 오전 12:00" → "2025-11-17T00:00:00"
 */
export const naturalDateToISO = (input: string): string => {
  const dateRegex = /(\d{4})년\s+(\d{1,2})월\s+(\d{1,2})일/;
  const dateMatch = input.match(dateRegex);

  if (!dateMatch) {
    throw new Error(`날짜 형식이 올바르지 않습니다: ${input}`);
  }

  const [, year, monthStr, dayStr] = dateMatch;
  const month = monthStr.padStart(2, "0");
  const day = dayStr.padStart(2, "0");

  const timeRegex = /(오전|오후)\s+(\d{1,2}):(\d{2})/;
  const timeMatch = input.match(timeRegex);

  if (!timeMatch) {
    throw new Error(`시간 형식이 올바르지 않습니다: ${input}`);
  }

  const [, period, hourStr, minuteStr] = timeMatch;
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;

  if (period === "오전") {
    if (hour === 12) hour = 0; // 오전 12시 → 00시
  } else {
    if (hour !== 12) hour += 12; // 오후 1~11시 → 13~23
  }

  const hh = String(hour).padStart(2, "0");
  const mm = minute.padStart(2, "0");

  return `${year}-${month}-${day}T${hh}:${mm}:00`;
};
