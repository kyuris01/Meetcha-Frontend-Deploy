import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { AuthResponse, logoutResponse } from "./authTypes";
import { getResponseType } from "./authUtils";

export const sendAuthCode = async (authCode: string, addr: string) => {
  const data = { code: authCode, redirectUri: addr };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/google", "POST", data, false);
  localStorage.setItem("access-token", res.data.accessToken);
  localStorage.setItem("refresh-token", res.data.refreshToken);
  return res;
};

export const renewAccessToken = async (refToken: string) => {
  const data = { refreshToken: refToken };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/refresh", "POST", data, false);
  if (res.code === 200) {
    console.log(res.message);
    localStorage.setItem("access-token", res.data.accessToken);
    localStorage.setItem("refresh-token", res.data.refreshToken);
    return true;
  } else {
    return false;
  }
};

export const logout = async () => {
  const res: ApiResponse<logoutResponse> = await apiCall("/oauth/logout", "POST", null, true);
  const type = getResponseType(res.code);

  if (type === "success") {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    return res;
  } else {
    throw Promise.reject(new Error(res.message));
  }
};
