import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { SlideType } from "../../../components/domain/schedule/weekly_schedule/WeeklyCalendar";
import type { Schedule } from "@/apis/schedule/scheduleTypes";

interface ScheduleCrudState {
  clickedSpan: string;
  slideType: SlideType;
  setCrudOpen: Dispatch<SetStateAction<boolean>>;
  data?: Schedule;
}

export const ScheduleCrudContext = createContext<ScheduleCrudState | null>(null);

export const useScheduleCrudContext = () => {
  const ctx = useContext(ScheduleCrudContext);
  if (!ctx) throw new Error("ScheduleCrudContext not found");
  return ctx;
};
