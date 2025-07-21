import type { MeetingDataType } from "@/types/meeting-data-type";
import { create } from "zustand";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface MeetingState {
  meetingList: MeetingDataType[];
  fetchMeetings: (id: number) => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  fetchMeetings: async (id) => {
    const res = await fetch(`${API_BASE}/meeting_list?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    set({ meetingList: data.data });
  },
}));
