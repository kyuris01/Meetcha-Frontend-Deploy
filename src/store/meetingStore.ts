import type { MeetingDataType } from "@/types/meeting-data-type";
import { create } from "zustand";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
const access_token = sessionStorage.getItem("access-token");

interface MeetingState {
  meetingList: MeetingDataType[];
  fetchMeetings: () => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  fetchMeetings: async () => {
    const res = await fetch(`${API_BASE}/meeting-lists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    set({ meetingList: data.data });
  },
}));
