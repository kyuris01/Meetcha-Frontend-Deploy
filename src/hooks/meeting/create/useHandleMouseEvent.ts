import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export const useMouseEvent = ({ open, setOpen, targetRef }: Props) => {
  useEffect(() => {
    if (!open) return; // 열려있을 때만 리스너 등록

    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (targetRef.current && !targetRef.current.contains(target)) {
        setOpen(false); // 바깥 클릭 → 닫기
      }
    };

    document.addEventListener("mousedown", onDown);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, targetRef]); // 의존성
};
