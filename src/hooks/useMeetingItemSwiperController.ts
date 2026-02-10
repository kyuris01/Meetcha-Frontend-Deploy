import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMeetingStore } from "@/store/meetingStore";

const DelBtnWidth = 72;
const OPEN_THRESHOLD = 0.5;
const MOVE_THRESHOLD = 6;

export const useMeetingItemSwiperController = (meetingId: string, isMatchFailed: boolean) => {
  const navigate = useNavigate();

  //const [open, setOpen] = useState<boolean>(false);
  //전역 상태 사용
  const { openedMeetingId, setOpenedMeetingId } = useMeetingStore();
  const isOpen = openedMeetingId === meetingId;

  const [tx, setTx] = useState<number>(0); //카드의 X축 이동 픽셀값
  const [dragging, setDragging] = useState<boolean>(false); //스와이프가 진행중인지 여부

  const startXRef = useRef(0);
  const startYRef = useRef(0);

  const movedRef = useRef(false); //드래그가 발생했는지

  useEffect(() => {
    setTx(isOpen ? -DelBtnWidth : 0); //-72px이동했다...
  }, [isOpen]);

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  const handleClick = () => {
    if (openedMeetingId !== null) {
      setOpenedMeetingId(null);
      return;
    } //다른 카드가 열려있으면 클릭해도 이동하지 않고 다 닫아버림
    navigate("detail", {
      state: {
        meetingId: meetingId,
      },
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMatchFailed) return;

    if (openedMeetingId !== null && openedMeetingId !== meetingId) {
      setOpenedMeetingId(null);
    }

    setDragging(true);
    movedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;

    // 드래그 캡처, 드래그가 시작된 이후, 커서가 요소 밖으로 나가더라도 pointermove/pointer up 이벤트를 계속 이요소가 받게 하려는 기능
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !isMatchFailed) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (Math.abs(dx) > MOVE_THRESHOLD || Math.abs(dy) > MOVE_THRESHOLD) {
      movedRef.current = true;
    } else {
      return;
    }

    if (Math.abs(dx) < Math.abs(dy)) return; // 커서의 수평이동량이 더 많을 경우에만 슬라이드

    // 왼쪽 스와이프만 허용(컨텐츠를 왼쪽으로 보내 버튼 노출)
    const next = clamp(dx + (isOpen ? -DelBtnWidth : 0), -DelBtnWidth, 0);
    setTx(next);
    // 스와이프 중 화면이 스크롤 되는것을 막아준다.
    e.preventDefault();
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    if (!movedRef.current) {
      handleClick();
      return;
    }

    const shouldOpened = Math.abs(tx) >= DelBtnWidth * OPEN_THRESHOLD;
    setOpenedMeetingId(shouldOpened ? meetingId : null);
  };

  return { onPointerDown, onPointerMove, onPointerUp, dragging, tx, isOpen };
};
