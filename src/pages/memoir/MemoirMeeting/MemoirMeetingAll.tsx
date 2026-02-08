import { useEffect, useMemo, useRef, useState } from "react";
import MymeetingSummary from "../../../components/domain/memoir/MemoirMeeting/MymeetingSummary";
import MustListContainer from "../../../components/domain/memoir/MemoirMeeting/MustListContainer";
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

const MemoirMeetingAll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const didInit = useRef(false);
  const didRefetch = useRef(false);
  const mounted = useRef(true);

  const [meetingLists, setMeetingLists] = useState<meetingList[] | null | undefined>(null);
  const [memoirLists, setMemoirLists] = useState<memoirList[] | null | undefined>(null);
  const [meetingSummary, setMeetingSummary] = useState<meetingSummary | null | undefined>(null);

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
    loadMeetingLists();
    loadMemoirLists();
    loadMeetingSummary();
    navigate(location.pathname, { replace: true, state: undefined });
  }, []);
  //null이나 undefined이면 빈 배열로 흘려보내서 컴포넌트는 항상 렌더링 되게끔 한다.
  const safeMeetingLists = meetingLists ?? [];
  const safeMemoirLists = memoirLists ?? [];
  const safeMeetingSummary = meetingSummary ?? null;

  const memoirWithTheme: MemoirWithTheme[] = useMemo(
    () =>
      safeMemoirLists.map((m: memoirList) => ({
        ...m,
        // memoir 항목에 projectId가 없을 수도 있으니 fallback 더 넓게
        theme: getProjectTheme(m.projectId),
      })),
    [safeMemoirLists]
  );

  return (
    <div style={{ flex: 1, width: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
      <MymeetingSummary meetingSummary={safeMeetingSummary} />
      <MustListContainer meetingLists={safeMeetingLists} memoirLists={memoirWithTheme} />
    </div>
  );
};

export default MemoirMeetingAll;
