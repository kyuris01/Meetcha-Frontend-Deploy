export interface UISlot {
  startISO: string;
  endISO: string;
}

export interface SubmitAvailabilityBody {
  nickname?: string;
  selectedTimes: {
    startAt: string;
    endAt: string;
  }[];
}

export type ISODateTimeString = string; // e.g. "2025-08-19T18:00:00"
export type UUID = string;

export interface MeetingData {
  meetingId: UUID; // "028fe9e7-3207-4654-8417-bd60b64e6de7"
  title: string; // "티켓팅"
  description: string; // "제발저요"
  deadline: ISODateTimeString; // "2025-08-19T18:00:00" (ISO 8601)
  isClosed: boolean; // false
}

// export interface CandidateMeetingData {
//   meetingId: UUID; // "028fe9e7-3207-4654-8417-bd60b64e6de7"
//   title: string; // "티켓팅"
//   description: string;
// }
