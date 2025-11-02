// src/apis/client.ts
type JSONValue = any;

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const getAccess = () => sessionStorage.getItem("access-token");
const setAccess = (t: string) => sessionStorage.setItem("access-token", t);
const getRefresh = () =>
  localStorage.getItem("refresh-token") ?? sessionStorage.getItem("refresh-token") ?? "";
const setRefresh = (t?: string) => {
  if (t) localStorage.setItem("refresh-token", t);
};

let refreshInFlight: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  if (!refreshInFlight) {
    const body = JSON.stringify({ refreshToken: getRefresh() });
    refreshInFlight = fetch(`${API_BASE}/oauth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 쿠키 쓰면 유지
      body,
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok || data?.code !== 200) throw new Error(data?.message || "refresh failed");
        const { accessToken, refreshToken } = data.data || {};
        if (!accessToken) throw new Error("no access token in refresh");
        setAccess(accessToken);
        if (refreshToken) setRefresh(refreshToken);
        return accessToken as string;
      })
      .catch(() => null)
      .finally(() => {
        // 다음 갱신을 위해 한번만 사용하고 초기화
        const _ = refreshInFlight;
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

type RequestOpts = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: JSONValue;
  headers?: Record<string, string>;
  withAuth?: boolean; // 기본 true
  retryOn401?: boolean; // 기본 true
};

async function request<T = any>(url: string, opts: RequestOpts = {}): Promise<T> {
  const { method = "GET", body, headers = {}, withAuth = true, retryOn401 = true } = opts;

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // 쿠키 기반이면 유지
  };

  if (withAuth) {
    const token = getAccess();
    if (token) (init.headers as any).Authorization = `Bearer ${token}`;
  }
  if (body !== undefined) init.body = typeof body === "string" ? body : JSON.stringify(body);

  const doFetch = async () => {
    const res = await fetch(`${API_BASE}${url}`, init);
    const data = await res.json().catch(() => null);
    return { res, data };
  };

  // 1차 시도
  let { res, data } = await doFetch();

  // 액세스 토큰 만료(401) → /oauth/refresh → 성공 시 1회 재시도
  if (
    withAuth &&
    retryOn401 &&
    res.status === 401 &&
    typeof data?.message === "string" &&
    /만료|expired/i.test(data.message)
  ) {
    const newAccess = await refreshToken();
    if (!newAccess) {
      // 리프레시도 실패 → 로그인 페이지로
      window.location.replace("/login");
      throw new Error("refresh failed");
    }
    // 토큰 헤더 갈아끼고 재시도
    (init.headers as any).Authorization = `Bearer ${newAccess}`;
    ({ res, data } = await doFetch());
  }

  if (!res.ok) {
    // 서버 표준 포맷을 그대로 던지기
    const msg = data?.message || `HTTP ${res.status}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}

// 편의 함수
export const api = {
  get: <T = any>(u: string, h?: RequestOpts["headers"]) => request<T>(u, { headers: h }),
  post: <T = any>(u: string, b?: JSONValue, h?: RequestOpts["headers"]) =>
    request<T>(u, { method: "POST", body: b, headers: h }),
  put: <T = any>(u: string, b?: JSONValue, h?: RequestOpts["headers"]) =>
    request<T>(u, { method: "PUT", body: b, headers: h }),
  patch: <T = any>(u: string, b?: JSONValue, h?: RequestOpts["headers"]) =>
    request<T>(u, { method: "PATCH", body: b, headers: h }),
  delete: <T = any>(u: string, h?: RequestOpts["headers"]) =>
    request<T>(u, { method: "DELETE", headers: h }),
};

export { request };
