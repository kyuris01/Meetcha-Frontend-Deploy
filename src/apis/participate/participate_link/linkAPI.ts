import { apiCall } from "@/apis/apiCall";
import type { ApiResponse } from "@/apis/common/types";
import type { MeetingData } from "./linkTypes";

export const requestLinkCheckFunc = async (linkText: string) => {
  try {
    const code = linkText.trim();
    if (!code) throw new Error("Empty meeting code");

    const res: ApiResponse<MeetingData> = await apiCall(
      `/meeting/code/${encodeURIComponent(code)}`,
      "GET",
      null,
      true
    );
    return res;
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e));
  }
};
