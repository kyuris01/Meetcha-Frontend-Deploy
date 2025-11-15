import { apiCall } from "@/apis/apiCall";
import type { ApiResponse } from "@/apis/common/types";

import type { MeetingData } from "./linkTypes";

export const requestLinkCheckFunc = async (linkText: string) => {
  const code = linkText.trim();
  if (!code) return;
  const res: ApiResponse<MeetingData> = await apiCall(
    `/meeting/code/${encodeURIComponent(code)}`, // ← 복수형 + 슬러그
    "GET",
    null,
    true // 인증 필요
  );
  return res;
};
