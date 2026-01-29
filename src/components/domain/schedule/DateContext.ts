import { createContext, useContext } from "react";

export type DateContextValue = {
  year: number;
  month: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export const DateContext = createContext<DateContextValue | null>(null);

export function useScheduleDate() {
  const ctx = useContext(DateContext);
  if (!ctx) throw Error("Schedule Date Context Error");
  return ctx;
}
