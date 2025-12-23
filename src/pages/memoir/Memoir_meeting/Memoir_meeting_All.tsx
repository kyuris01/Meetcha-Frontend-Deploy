import React, { useEffect, useMemo, useRef, useState } from "react";
import Mymeeting_summary from "./Mymeeting_summary";
import Must_list_container from "./Must_list_container";
import { useLocation, useNavigate } from "react-router-dom";

import { getMeetingLists, getMemoirLists, getMeetingSummary } from "@/apis/memoir/memoirAPI";

import { getProjectTheme } from "@/utils/theme";

import type {
  meetingList,
  meetingSummary,
  memoirList,
  MemoirWithTheme,
  MemoirLocationState,
} from "@/apis/memoir/memoirTypes";

const Memoir_meeting_All = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const didInit = useRef(false);
  const didRefetch = useRef(false);
  const mounted = useRef(true);

  const [meetingLists, setMeetingLists] = useState<meetingList[] | null>(null);
  const [memoirLists, setMemoirLists] = useState<memoirList[] | null>(null);
  const [meetingSummary, setMeetingSummary] = useState<meetingSummary | null>(null);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []); //unmount될 때 false로 바뀐다.

  const loadMeetingLists = async () => {
    const res = await getMeetingLists();
    setMeetingLists(res);
  }; //작성이 필요한 미팅
  const loadMemoirLists = async () => {
    const res = await getMemoirLists();
    setMemoirLists(res);
  }; //작성이 완료된 미팅
  const loadMeetingSummary = async () => {
    const res = await getMeetingSummary();
    setMeetingSummary(res);
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    loadMeetingLists();
    loadMemoirLists();
    loadMeetingSummary();
  }, []);

  useEffect(() => {
    const s: MemoirLocationState = location.state;
    if (!s?.refetchMemoirs || didRefetch.current) return;

    didRefetch.current = true;
    getMeetingLists();
    getMemoirLists();
    getMeetingSummary();
    navigate(location.pathname, { replace: true, state: undefined });
  }, []);

  const memoir = Array.isArray(memoirLists) ? memoirLists : [];

  const memoirWithTheme: MemoirWithTheme[] = useMemo(
    () =>
      memoir.map((m: memoirList) => ({
        ...m,
        // memoir 항목에 projectId가 없을 수도 있으니 fallback 더 넓게
        theme: getProjectTheme(m.projectId),
      })),
    [memoir]
  );
  console.log(memoirWithTheme);
  if (!meetingLists || !memoirLists || !meetingSummary) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>⌛ 로딩 중…</p>
      </>
    );
  }

  return (
    <div style={{ flex: 1, width: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
      <Mymeeting_summary meetingSummary={meetingSummary} />
      <Must_list_container meetingLists={meetingLists} memoirLists={memoirWithTheme} />
    </div>
  );
};

export default Memoir_meeting_All;
