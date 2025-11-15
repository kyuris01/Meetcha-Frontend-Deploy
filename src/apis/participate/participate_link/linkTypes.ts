export interface MeetingData {
  meetingId: string;
  title: string;
  description: string;
  deadline: string;
  isClosed: boolean;
}

export interface aboutMeeting {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MeetingData;
}
