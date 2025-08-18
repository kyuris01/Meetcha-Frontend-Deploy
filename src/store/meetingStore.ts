import { fetchMeetingList } from "@/apis/meeting/meetingAPI";
import type { Meeting } from "@/apis/meeting/meetingTypes";
import { create } from "zustand";

interface MeetingState {
  meetingList: Meeting[];
  fetchMeetings: () => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  fetchMeetings: async () => {
    const data = await fetchMeetingList();
    // console.log(data);
    set({ meetingList: data });
  },
}));
