export interface MeetingDataType {
  meeting_id: string; // UUID
  title: string; // VARCHAR, NOT NULL
  description: string | null; // TEXT, NULL 허용
  duration_minutes: number | null; // INT, NULL 허용
  deadline: string | null; // DATETIME (ISO 8601 형식), NULL 허용
  created_at: string; // DATETIME (ISO 8601 형식)
  meeting_status: "생성중" | "진행중" | "종료" | "실패"; // ENUM 타입 지정
  confirmed_time: string | null; // DATETIME (ISO 8601 형식), NULL 허용
  meeting_code: string; // VARCHAR, NOT NULL, UNIQUE
  created_by: string; // UUID, NOT NULL
  project_id: string; // UUID, NOT NULL
}

export interface AlternativeScheduleDataType {
  date: string; // "YYYY/MM/DD"
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  availableNum: number;
  totalNum: number;
  failMembers: string[];
  adjustedTime: string; // e.g., "2:30"
}
