import type { ScheduleDataType } from "@/types/schedule-data-type";
import { create } from "zustand";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
const access_token = sessionStorage.getItem("access-token");

interface ScheduleState {
  scheduleList: ScheduleDataType[];
  fetchSchedules: () => void;
}

export const useScheduleStore = create<ScheduleState>()((set) => ({
  scheduleList: [],
  fetchSchedules: async () => {
    const res = await fetch(`/user/schedule?from=2025-07-20T00:00:00&to=2025-07-25T23:59:59`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    switch (data.code) {
      case 200:
        set({ scheduleList: data.data });
        break;
      default:
        alert(data.message);
        break;
    }
  },
}));
