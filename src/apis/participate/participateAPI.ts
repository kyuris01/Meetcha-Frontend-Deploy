import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { ParticipateResponse } from "./participateTypes";

export const fetchCurrentParticipate = async (meetingId: string) => {
  const res: ApiResponse<ParticipateResponse> = await apiCall(
    `/meeting/${meetingId}/available-times`,
    "GET",
    null,
    true
  );

  return res.data.selectedTimes;
};
