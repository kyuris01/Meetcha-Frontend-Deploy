import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { Schedule } from "./scheduleTypes";
import { buildRange } from "./scheduleUtils";

export const scheduleKeys = {
  all: ["schedules"] as const,
  month: (year: string, month: string) => [...scheduleKeys.all, `${year}-${month}`] as const,
};

export const fetchSchedules = async (year: string, month: string) => {
  const { from, to } = buildRange(year, month);
  const res: ApiResponse<Schedule[]> = await apiCall(
    `/user/schedule?from=${from}&to=${to}`,
    "GET",
    null,
    true
  );
  return res.data;
};

export const createSchedule = async (data) => {
  const res: ApiResponse<string> = await apiCall(`/schedule-create`, "POST", data, true);
  alert(res.message);
  return res;
};

export const editSchedule = async (data) => {
  const res: ApiResponse<null> = await apiCall(`/user/schedule/update`, "PUT", data, true);
  alert(res.message);
  return res;
};

export const deleteSchedule = async (scheduleId) => {
  const res: ApiResponse<null> = await apiCall(
    `/user/schedule/delete?eventId=${scheduleId}`,
    "DELETE",
    null,
    true
  );
  alert(res.message);
  return res;
};
