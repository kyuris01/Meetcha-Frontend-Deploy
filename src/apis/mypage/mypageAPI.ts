import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { profileResponse } from "./mypageTypes";

export const fetchProfileData = async () => {
  const res: ApiResponse<profileResponse> = await apiCall("/user/mypage", "GET", null, true);

  if (res.code >= 200 && res.code < 300) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
};
