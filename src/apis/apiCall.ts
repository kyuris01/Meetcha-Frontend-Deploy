import type { ApiResponse } from "./common/types";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async <T>(
  path: string,
  method = "GET",
  data?: any,
  withAuth = false
): Promise<ApiResponse<T>> => {
  const access_token = sessionStorage.getItem("access-token");

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && { Authorization: `Bearer ${access_token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    if (res.ok) {
      console.log(`Api Call Success: ${res.status} ${res.statusText}`);
    } else {
      console.error(`Api Call Failed: ${res.status} ${res.statusText}`);
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (e: any) {
    console.error(e.message);
    throw e;
  } finally {
  }
};
