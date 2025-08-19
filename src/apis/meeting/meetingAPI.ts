import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { AlternativeObj, Meeting, MeetingCreateResponse, MeetingDetail } from "./meetingTypes";

export const fetchMeetingList = async () => {
  const res: ApiResponse<Meeting[]> = await apiCall("/meeting-lists", "GET", null, true);
  console.log("meetingLists:", res);
  return res.data;
};

export const fetchMeetingDetail = async (meetingId: string) => {
  const res: ApiResponse<MeetingDetail> = await apiCall(
    `/meeting-lists/${meetingId}`,
    "GET",
    null,
    true
  );
  console.log("meetingDetail: ", res);
  return res.data;
};

export const setAlternativeMeeting = async (meetingId: string, data) => {
  const res = await apiCall(`/meeting-lists/${meetingId}/alternative-vote`, "POST", data, true);
  return res;
};

export const fetchAlternativeMeeting = async (meetingId: string) => {
  const res: ApiResponse<AlternativeObj> = await apiCall(
    `/meeting-lists/${meetingId}/alternative-times`,
    "GET",
    null,
    true
  );
  return res.data.alternativeTimes;
};

export const createMeeting = async (data) => {
  const res: ApiResponse<MeetingCreateResponse> = await apiCall(
    "/meeting/create",
    "POST",
    data,
    true
  );

  switch (res.code) {
    case 201:
      alert(res.message);

      return res;
    

    case 400:
      const details = Object.entries(res.data)
        .map(([_, value]) => `• ${value}`)
        .join("\n");
      alert(`${res.message}\n${details}`);
      break;
    default:
      alert(res.message);
  }
};
