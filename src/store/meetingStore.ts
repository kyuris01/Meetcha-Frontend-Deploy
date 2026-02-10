import { fetchMeetingList } from "@/apis/meeting/meetingAPI";
import type { Meeting } from "@/apis/meeting/meetingTypes";
import { create } from "zustand";

interface MeetingState {
  meetingList: Meeting[];
  fetchMeetings: () => void;
  openedMeetingId: string | null;
  setOpenedMeetingId: (id: string | null) => void;
}
//삭제버튼 하나나오기 위해 전역변수에 openedMeetingId상태 추가
export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  openedMeetingId: null,

  fetchMeetings: async () => {
    try {
      const data = await fetchMeetingList();
      set({ meetingList: data });
    } catch (error) {
      console.error("미팅 목록 로드 실패:", error);
    }
  },

  setOpenedMeetingId: (id) => set({ openedMeetingId: id }),
}));
