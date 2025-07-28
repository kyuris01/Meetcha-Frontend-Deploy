import type { ScheduleDataType } from "@/types/schedule-data-type";
import { create } from "zustand";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface ScheduleState {
  scheduleList: ScheduleDataType[];
  fetchSchedules: (id: number) => void;
}

export const useScheduleStore = create<ScheduleState>()((set) => ({
  scheduleList: [],
  fetchSchedules: async (id) => {
    const res = await fetch(`${API_BASE}/schedules?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data.data);
    set({ scheduleList: data.data });
  },
}));
