import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type {
  ParticipateResponse,
  MeetingInfoData,
  UserScheduleData,
  SubmitAvailabilityBody,
  UpdateAvailabilityBody,
  SubmitAvailabilityRes,
  UpdateAvailabilityRes,
} from "./participateTypes";

export const getUserMeetingData = async (meetingId: string) => {
  const res: ApiResponse<MeetingInfoData> = await apiCall(
    `/meeting/id/${meetingId}`,
    "GET",
    null,
    true
  );

  return res.data;
};

export const getUserScheduleData = async (first: string, last: string) => {
  const res: ApiResponse<UserScheduleData[]> = await apiCall(
    `/user/schedule?from=${first}T00:00:00&to=${last}T23:59:59`,
    "GET",
    null,
    true
  );

  return res.data;
};

export const getPreviousAvailTime = async (meetingId: string) => {
  const res: ApiResponse<ParticipateResponse> = await apiCall(
    `/meeting/${meetingId}/available-times`,
    "GET",
    null,
    true
  );

  return res.data;
};

export const submitAvailability = async (meetingId: string, body: SubmitAvailabilityBody) => {
  const res: ApiResponse<SubmitAvailabilityRes> = await apiCall(
    `/meeting/id/${meetingId}/join`,
    "POST",
    body,
    true
  );
  return res.data;
};

export const updateAvailability = async (meetingId: string, body: UpdateAvailabilityBody) => {
  const res: ApiResponse<UpdateAvailabilityRes> = await apiCall(
    `/meeting-lists/${meetingId}`,
    "PATCH",
    body,
    true
  );

  return res.data;
};
