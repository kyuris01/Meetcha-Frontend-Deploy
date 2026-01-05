import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/const/localStorage";
import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { AuthResponse, logoutResponse } from "./authTypes";
import { getResponseType } from "./authUtils";

export const sendAuthCode = async (authCode: string, addr: string) => {
  const data = { code: authCode, redirectUri: addr };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/google", "POST", data, false);
  localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
  localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
  return res;
};

export const logout = async () => {
  const res: ApiResponse<logoutResponse> = await apiCall("/oauth/logout", "POST", null, true);
  const type = getResponseType(res.code);

  if (type === "success") {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    return res;
  } else {
    throw Promise.reject(new Error(res.message));
  }
};
