import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { AuthResponse } from "./authTypes";

export const sendAuthCode = async (authCode: string, addr: string) => {
  const data = { code: authCode, redirectUri: addr };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/google", "POST", data, false);
  sessionStorage.setItem("access-token", res.data.accessToken);
  sessionStorage.setItem("refresh-token", res.data.refreshToken);
  return res;
};

export const renewAccessToken = async (refToken: string) => {
  const data = { refreshToken: refToken };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/refresh", "POST", data, false);
  if (res.code === 200) {
    console.log(res.message);
    sessionStorage.setItem("access-token", res.data.accessToken);
    sessionStorage.setItem("refresh-token", res.data.refreshToken);
    return true;
  } else {
    console.error(res.message);
    return false;
  }
};
