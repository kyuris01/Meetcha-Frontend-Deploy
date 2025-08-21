import { renewAccessToken } from "./auth/authAPI";
import type { ApiResponse } from "./common/types";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async <T>(
  path: string,
  method = "GET",
  data?: any,
  withAuth = false
): Promise<ApiResponse<T>> => {
  const access_token = sessionStorage.getItem("access-token");
  const refresh_token = sessionStorage.getItem("refresh-token");

  const doFetch = () =>
    fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && { Authorization: `Bearer ${access_token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });

  try {
    let res = await doFetch();

    if (res.ok) {
      console.log(`Api Call Success: ${res.status} ${res.statusText}`);
    } else {
      console.error(`Api Call Failed: ${res.status} ${res.statusText}`);
    }

    if (res.status === 401 && !path.includes("/oauth/refresh")) {
      if (refresh_token && (await renewAccessToken(refresh_token))) {
        res = await doFetch();
        if (res.ok) {
          console.log(`Api Call Success (after refresh): ${res.status} ${res.statusText}`);
          return res.json();
        }
      }
      console.error("Unauthorized: token refresh failed or retry failed.");
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      window.location.href = "/";
    }

    return res.json();
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};
