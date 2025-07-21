import React, { useRef, useState } from "react";
import styles from "./CarouselContainer.module.scss";
import type { MeetingDataType } from "@/types/meeting-data-type";

interface Props {
  dataSet: MeetingDataType[];
  renderItem: (data: MeetingDataType, index: number) => React.ReactNode;
}

const CarouselContainer = ({ dataSet, renderItem }: Props) => {
  const dataArray = dataSet;
  const isDragging = useRef(false);
  const translateXRef = useRef(0); // 마우스를 놓을 때 저장해두는 기존 오프셋
  const startX = useRef(0);
  const [translateX, setTranslateX] = useState(0); // 이동량
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // 공통으로 쓰일 move/ up 핸들러
  const handleMove = (clientX: number) => {
    const delta = clientX - startX.current;
    const carouselItems = Array.from(carouselContainerRef.current.children);
    const itemWidth = carouselItems[0].clientWidth;
    const itemSize = carouselItems.length;
    const newTranslateX = translateXRef.current + delta;

    // // 좌측 이동
    // if (delta < 0) {
    //   // 만약 예상되는 이동량이 캐러셀 컨테이너의 크기보다 큰 경우
    //   console.log(carouselContainerRef.current.offsetWidth);
    //   if (delta + translateXRef.current < 0) {
    //     // 아이템이 하나 보이는 정도까지만 캐러셀 이동
    //     console.log(-(itemWidth * (itemSize - 1) + 16 * (itemSize - 2) + 8));
    //     setTranslateX(0);
    //     return;
    //   }
    // }
    // // 우측 이동
    // else if (delta > 0) {
    //   // 만약 예상되는 이동량이 캐러셀 아이템을 하나 뺀 캐러셀 컨테이너 크기보다 큰 경우
    //   if (
    //     delta + translateXRef.current >
    //     (itemSize - 1) * itemWidth + (itemSize - 1) + 16 * (itemSize - 2) + 8
    //   ) {
    //     // 아이템이 하나 보이는 정도까지만 캐러셀 이동
    //     setTranslateX((itemSize - 1) * itemWidth + (itemSize - 1) + 16 * (itemSize - 2) + 8);
    //     return;
    //   }
    // }
    // setTranslateX(delta + translateX);

    // 우측 경계 (0보다 오른쪽으로 이동하지 않도록)
    const maxTranslateX = 0;

    // 좌측 경계 (마지막 아이템이 하나 보이는 정도까지만 이동)
    const minTranslateX = -(itemWidth * (itemSize - 1) + 16 * (itemSize - 2) + 8);

    // 경계 내에서만 이동하도록 실시간 제한
    const clampedTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));

    // console.log("minTranslateX:", minTranslateX);
    // console.log("maxTranslateX:", maxTranslateX);
    // console.log("clampedTranslateX:", clampedTranslateX);

    setTranslateX(clampedTranslateX);
  };

  const handleEnd = (clientX: number) => {
    isDragging.current = false;
    translateXRef.current += clientX - startX.current;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  // Mouse 이동 관련 이벤트 핸들러
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onMouseUp = (e: MouseEvent) => handleEnd(e.clientX);

  // 모바일 Touch 관련 이벤트 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // 스크롤 막기
    handleMove(e.touches[0].clientX);
  };
  const onTouchEnd = (e: TouchEvent) => {
    // touches가 비어있으므로 changedTouches 사용
    handleEnd(e.changedTouches[0].clientX);
  };

  return (
    <div
      ref={carouselContainerRef}
      className={styles.carouselContainer}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        transform: `translateX(${translateX}px)`,
        cursor: isDragging.current ? "grabbing" : "grab",
        touchAction: "none", // iOS/Android 기본 스크롤 방지
        userSelect: "none",
      }}
    >
      {dataArray && dataArray.map((data, index) => renderItem(data, index))}
    </div>
  );
};

export default CarouselContainer;
