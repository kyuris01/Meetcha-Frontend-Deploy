export interface Meeting {
  meetingId: string;
  title: string;
  description: string | null;
  durationMinutes: number | null;
  deadline: string | null;
  createdAt: string;
  meetingCode: string;
  meetingStatus: "MATCHING" | "ONGOING" | "DONE" | "MATCH_FAILED" | "BEFORE";
  confirmedTime: string | null;
}

export interface MeetingDetail {
  meetingId: string;
  title: string;
  description: string;
  deadline: string;
  durationMinutes: number;
  participants: Participant[];
  meetingStatus: "MATCHING" | "ONGOING" | "DONE" | "MATCH_FAILED" | "BEFORE";
  confirmedTime: string;
}

export interface Participant {
  participantId: string;
  nickname: string;
  profileImageUrl: string;
}

export interface AlternativeMeeting {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  availableNum: number;
  includedUserNames: string[];
  excludedUserNames: string[];
  adjustedDurationMinutes: number;
  checked: boolean;
}

export interface AlternativeObj {
  alternativeTimes: AlternativeMeeting[];
}

export interface MeetingCreateResponse {
  meetingId: string;
  createdAt: string;
}
