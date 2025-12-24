import { useContext, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import styles from "./InfiniteLoopSlider.module.scss";
import { DateContext, type DateContextValue } from "./DataContext";

interface Props {
  setIsSliderOpen: Dispatch<SetStateAction<boolean>>;
}

const InfiniteLoopSlider = ({ setIsSliderOpen }: Props) => {
  const { year, month, setYear, setMonth } = useContext(DateContext) as DateContextValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 60;
  const oneSetWidth = itemWidth * 12;
  const baseNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const extendedNumbers = [...baseNumbers, ...baseNumbers, ...baseNumbers];
  const isInitializing = useRef(true);

  const [activeIndex, setActiveIndex] = useState<number>(Number(month) - 1 + baseNumbers.length);

  // --- 드래그 상태 (데스크톱)
  const isDragging = useRef(false);
  const [isDragMode, setIsDragMode] = useState(false); // UI용
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const pointerActive = useRef(false);
  const justDragged = useRef(false);
  const DRAG_THRESHOLD = 8; // px

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = (Number(month) - 1 + baseNumbers.length) * itemWidth;
      isInitializing.current = false;
    }
  }, []);

  const handleScroll = () => {
    if (isInitializing.current) return; // 초기 active Index를 정할때 추가 스크롤되지 않기 위한 방어 로직

    const container = containerRef.current;
    if (!container) return;

    let currentScrollLeft = container.scrollLeft;

    // 월이 변경될 때 연도 조정
    if (currentScrollLeft >= oneSetWidth * 2) {
      currentScrollLeft -= oneSetWidth;
      container.scrollLeft = currentScrollLeft;
    } else if (currentScrollLeft <= oneSetWidth * 0.5) {
      currentScrollLeft += oneSetWidth;
      container.scrollLeft = currentScrollLeft;
    }

    const newRawIndex = Math.round(currentScrollLeft / itemWidth);

    // 12월 <-> 1월 경계 넘었는지 감지하여 연도 변경
    // (현재 보여지는 숫자로 비교)
    const currentMonthVal = extendedNumbers[activeIndex];
    const newMonthVal = extendedNumbers[newRawIndex];

    if (currentMonthVal === 12 && newMonthVal === 1) {
      setYear(Number(year) + 1);
    } else if (currentMonthVal === 1 && newMonthVal === 12) {
      setYear(Number(year) - 1);
    }

    setActiveIndex(newRawIndex);
    setMonth(Number(newMonthVal) % 12 === 0 ? 12 : Number(newMonthVal) % 12);
  };

  // ---------- Pointer Events: 드래그로 스크롤 ----------
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    pointerActive.current = true;
    isDragging.current = false; // <- 중요: 초기에는 false
    setIsDragMode(false);
    hasMoved.current = false;

    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = container.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !pointerActive.current) return;

    const dx = e.clientX - dragStartX.current;

    // 임계값 넘기 전까지는 '클릭 후보' 상태 → 아무것도 막지 않음
    if (!isDragging.current) {
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        // 이 시점부터 '드래그 시작'
        isDragging.current = true;
        setIsDragMode(true);
        hasMoved.current = true;

        container.setPointerCapture((e as React.PointerEvent<HTMLDivElement>).pointerId);

        // 드래그 시작 후에만 기본 제스처 막기
        e.preventDefault();
      } else {
        return; // 아직 클릭 후보 → 조용히 리턴
      }
    } else {
      // 이미 드래그 중인 경우에만 preventDefault + 스크롤 처리
      e.preventDefault();
    }

    // 드래그 스크롤
    container.scrollLeft = dragStartScrollLeft.current - dx;
  };

  const snapToNearest = () => {
    const container = containerRef.current;
    if (!container) return;

    let targetLeft = container.scrollLeft;

    // 경계 보호
    targetLeft = Math.max(0, Math.min(targetLeft, container.scrollWidth - container.clientWidth));

    // 아이템 경계로 스냅
    const snapIndex = Math.round(targetLeft / itemWidth);
    const snapLeft = snapIndex * itemWidth;

    container.scrollTo({ left: snapLeft, behavior: "smooth" });
  };

  const onPointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (isDragging.current) {
      // 드래그 종료 → 스냅 + 다음 클릭 1회 무시
      justDragged.current = true;
      setTimeout(() => (justDragged.current = false), 0);

      snapToNearest();

      container?.releasePointerCapture((e as React.PointerEvent<HTMLDivElement>).pointerId);
    }

    // 포인터 사이클 종료
    pointerActive.current = false;
    isDragging.current = false;
    setIsDragMode(false);
  };

  return (
    <div
      className={styles.numberScrollerContainer}
      ref={containerRef}
      onScroll={handleScroll}
      data-dragging={isDragMode ? "true" : "false"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUpOrCancel}
      onPointerCancel={onPointerUpOrCancel}
    >
      {extendedNumbers.map((num, i) => (
        <div
          key={i}
          className={clsx(styles.numberItem, i === activeIndex && styles.active)}
          style={{ width: itemWidth }}
          onClick={() => {
            if (justDragged.current) return; // 드래그 직후 클릭 무시
            if (i === activeIndex) setIsSliderOpen((prev) => !prev);
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default InfiniteLoopSlider;
