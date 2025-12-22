import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";

import type {
  meetingList,
  memoirList,
  meetingSummary,
  MemoirDetail,
  PostMemoirReturn,
  PostMemoirPayload,
} from "./memoirTypes";

export const getMeetingLists = async () => {
  const res: ApiResponse<meetingList[]> = await apiCall(
    `/meeting-lists/need-reflection`,
    "GET",
    null,
    true
  );
  if (res.code === 401) {
    alert("인증이 필요합니다");
  } else if (res.code === 200) {
    return res.data;
  } else {
    alert("서버 오류");
  }
};

export const getMemoirLists = async () => {
  const res: ApiResponse<memoirList[]> = await apiCall(`/meeting/reflections`, "GET", null, true);
  if (res.code === 401) {
    alert("인증 토큰이 필요합니다!");
  } else if (res.code === 200) {
    return res.data;
  } else {
    alert("서버 오류");
  }
};

export const getMeetingSummary = async () => {
  const res: ApiResponse<meetingSummary> = await apiCall(`/reflection/summary`, "GET", null, true);
  if (res.code === 401) {
    alert("인증 토큰이 필요합니다!");
  } else if (res.code === 200) {
    return res.data;
  } else {
    alert("서버 오류");
  }
};

export const getChosenMemoir = async (meetingId) => {
  const res: ApiResponse<MemoirDetail> = await apiCall(
    `/meeting/${meetingId}/reflection`,
    "GET",
    null,
    true
  );

  if (res.code == 401) {
    alert("인증이 필요합니다");
  } else if (res.code === 404) {
    alert("사용자를 찾을 수 없습니다.");
  } else if (res.code === 200) {
    return res.data;
  } else {
    alert("서버오류");
  }
};

export const postMemoir = async (meetingId: string, data: PostMemoirPayload) => {
  const res: ApiResponse<PostMemoirReturn> = await apiCall(
    `/meeting/${meetingId}/reflection/create`,
    "POST",
    data,
    true
  );

  switch (res.code) {
    case 201:
      return res;
    case 400:
      alert(res.message);
      break;
    case 401:
      alert(res.message);
      break;
    case 404:
      alert(res.message);
      break;
    default:
      alert(res.message);
      break;
  }
};
