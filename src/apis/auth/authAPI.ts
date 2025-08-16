import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { AuthResponse } from "./authTypes";

export const sendAuthCode = async (authCode: string) => {
  const data = { code: authCode };
  const res: ApiResponse<AuthResponse> = await apiCall("/oauth/google", "POST", data, false);
  sessionStorage.setItem("access-token", res.data.accessToken);
  console.log(res);
  return res;
};
