import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const dateFormatter = (input) => {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const scheduleStringFormatter = (input) => {
  const formattedDate = format(input, "MM월 dd일(EEE)", { locale: ko });
  const formattedTime = format(input, "a hh:mm").replace("AM", "오전").replace("PM", "오후");
  return `${formattedDate} ${formattedTime}`;
};
