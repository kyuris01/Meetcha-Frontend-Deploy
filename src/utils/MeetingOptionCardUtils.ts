import type { TileArgs } from "react-calendar";
import { isBefore, startOfDay, startOfMonth, startOfYear } from "date-fns";

// UI상의 데이터 표시를 위한 데이터 포맷 로직
export const formatMeetingCardUIData = (type: number, data: string | string[]) => {
  if (type === 1 && Array.isArray(data)) {
    return data.join(", ");
  } else if (type === 3 && typeof data === "string" && data.includes("T")) {
    const [date, time] = data.split("T");
    return `${date} ${time}`;
  } else if (type === 4) {
    if (!data) return;
    const index = data.indexOf(" ");
    return data.slice(index);
  } else {
    return data;
  }
};

export const isPreviousDate = (date: Date, view: TileArgs["view"] = "month") => {
  const now = new Date();

  const startOfDecade = (d: Date) => new Date(Math.floor(d.getFullYear() / 10) * 10, 0, 1);

  const normalizeByView = (d: Date) => {
    switch (view) {
      case "month":
        return startOfDay(d);
      case "year":
        return startOfMonth(d);
      case "decade":
        return startOfYear(d);
      case "century":
        // react-calendar century view tiles represent decades
        return startOfDecade(d);
      default:
        return startOfDay(d);
    }
  };

  const left = normalizeByView(date);
  const right = normalizeByView(now);
  // strictly earlier only; equal returns false per requirements
  return isBefore(left, right);
};
