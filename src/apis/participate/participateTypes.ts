export type ISODateTimeString = string; // e.g. "2025-08-19T18:00:00"
export type UUID = string;

export interface MeetingData {
  meetingId: UUID; // "028fe9e7-3207-4654-8417-bd60b64e6de7"
  title: string; // "티켓팅"
  description: string; // "제발저요"
  deadline: ISODateTimeString; // "2025-08-19T18:00:00" (ISO 8601)
  isClosed: boolean; // false
}

export interface ParticipateResponse {
  selectedTimes: ParticipateObject[];
}

export interface ParticipateObject {
  startAt: string;
  endAt: string;
}

export interface MeetingInfoData {
  meetingId: UUID;
  title: string;
  description: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: ISODateTimeString;
  createdAt: ISODateTimeString;
}

export interface UserScheduleData {
  eventId: string;
  title: string;
  startAt: ISODateTimeString;
  endAt: ISODateTimeString;
  recurrence: string;
}

export type PreviousAvailTime = ParticipateResponse;

export interface SubmitAvailabilityBody {
  nickname?: string;
  selectedTimes: {
    startAt: string;
    endAt: string;
  }[];
}

export interface SubmitAvailabilityRes {
  meetingId: UUID;
  participantId: UUID;
}

export interface UpdateAvailabilityBody {
  selectedTimes: ParticipateObject[];
}

export type UpdateAvailabilityRes = SubmitAvailabilityRes;

export interface EventWithColor {
  start: string;
  end: string;
  color: string;
}
