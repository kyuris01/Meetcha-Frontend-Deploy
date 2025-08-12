export interface MeetingDataType {
  meetingId: string; // UUID
  title: string; // VARCHAR, NOT NULL
  description: string | null; // TEXT, NULL 허용
  durationMinutes: number | null; // INT, NULL 허용
  deadline: string | null; // DATETIME (ISO 8601 형식), NULL 허용
  createdAt: string; // DATETIME (ISO 8601 형식)
  meetingStatus: "매칭 중" | "진행 중" | "완료" | "매칭 실패"; // ENUM 타입 지정
  confirmedTime: string | null; // DATETIME (ISO 8601 형식), NULL 허용
}

export interface MeetingDetailType {
  meetingId: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  durationMinutes: number;
  participants: Participant[];
  finalSchedule: FinalSchedule;
}

export interface Participant {
  participantId: string;
  nickname: string;
  profileImageUrl: string;
}

interface FinalSchedule {
  type: "success" | "fail"; // 필요에 따라 union 확장
  startAt: string; // ISO date string
  endAt: string; // ISO date string
}

export interface AlternativeScheduleDataType {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  availableNum: number;
  includedUserNames: string[];
  excludedUserNames: string[];
  adjustedDurationMinutes: number;
  checked: boolean;
}
