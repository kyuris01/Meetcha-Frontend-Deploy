import { createContext, useContext } from "react";

export interface WeeklyCalendarContextType {
  openCreate: (slotInfo: { start: Date; end: Date; action: string }) => void;
  blockInteraction: boolean;
}

export const WeeklyCalendarContext = createContext<WeeklyCalendarContextType | null>(null);

export const useWeeklyCalendarContext = () => {
  const context = useContext(WeeklyCalendarContext);
  if (!context) {
    throw new Error("useWeeklyCalendarContext must be used within a WeeklyCalendarProvider");
  }
  return context;
};
