import type { ApiResponse } from "./common/types";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
      localStorage.setItem("access-token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
    })
    .catch((e) => {
      throw e;
    });
};

const RETRY_LIMIT = 2;
export const apiCall = async <T>(
  path: string,
  method = "GET",
  data?: unknown,
  withAuth = false
): Promise<ApiResponse<T>> => {
  let SAFE_RETRY_FLAG = 0;

  const doFetch = () => {
    const access_token = localStorage.getItem("access-token");
    return fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && { Authorization: `Bearer ${access_token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });
  };
  return doFetch()
    .then((res) => {
      SAFE_RETRY_FLAG++;
      return res;
    })
    .then(async (res) => {
      // TODO: 매우 중요, 아직도 500 에러가 나옴
      // TODO: Bearer sdlksdfnk 같이 임의 작성이나, Bearer null같이 access token이 없는 경우 500에러
      if (res.status === 401 || res.status === 500) {
        const refresh_token = localStorage.getItem("refresh-token");
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
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      // TODO: 책임 이관 필요
      window.location.href = "/";
      throw e;
    });
};
