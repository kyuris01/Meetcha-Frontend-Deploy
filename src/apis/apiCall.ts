import { NetworkError, UnauthorizedError } from "@/errors/errors";
import type { ApiResponse } from "./common/types";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/const/localStorage";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
const RETRY_LIMIT = 2;

const tokenRefresh = async (refreshToken: string) => {
  return fetch(`${API_BASE}/oauth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
    })
    .catch((e) => {
      throw e;
    });
};

export const apiCall = async <T>(
  path: string,
  method = "GET",
  data?: unknown,
  withAuth = false
): Promise<ApiResponse<T>> => {
  let SAFE_RETRY_FLAG = 0;

  if (withAuth && !localStorage.getItem(ACCESS_TOKEN)) {
    throw new UnauthorizedError();
  }

  const doFetch = () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);

    return fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    });
  };
  return doFetch()
    .then((res) => {
      SAFE_RETRY_FLAG++;
      return res;
    })
    .then(async (res) => {
      if (res.status === 401) {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        if (refresh_token && SAFE_RETRY_FLAG < RETRY_LIMIT) {
          return tokenRefresh(refresh_token).then(() => doFetch());
        } else {
          throw new Error("Error, retry limit exceeded or refresh token not found");
        }
      } else {
        return res;
      }
    })
    .then((res) => res.json())
    .catch((e) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);

      if (e instanceof TypeError) {
        throw new NetworkError();
      }
      throw e;
    });
};
