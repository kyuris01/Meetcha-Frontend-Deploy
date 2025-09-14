import { useRef, useEffect, useState } from "react";
import styles from "./TimePicker.module.scss";

interface ValueProps {
  ampm: string;
  hour: string;
  minute: string;
}

// SCSS 변수 $item-height 과 반드시 동일
const ITEM_HEIGHT = 40;
const PADDING = 2 * ITEM_HEIGHT;

export default function TimePicker({ onChange, ampm, minRange, customHour }) {
  const ampmRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const isInitializing = useRef(true);

  // 휠 데이터 채워넣기
  const AMPM_OPTIONS = ["오전", "오후"];
  const HOUR_OPTIONS = customHour
    ? customHour
    : Array.from({ length: ampm ? 12 : 24 }, (_, i) => (ampm ? String(i + 1) : String(i)));
  const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).filter(
    (item) => Number(item) % minRange === 0
  );

  const [value, setValue] = useState<ValueProps>({
    ampm: "오전",
    hour: HOUR_OPTIONS[Math.floor(HOUR_OPTIONS.length / 2)].toString(),
    minute: "00",
  }); // 현재 선택된 값

  // 마운트 시 초기 스크롤 위치 맞추기
  useEffect(() => {
    if (ampm) {
      const idxA = AMPM_OPTIONS.indexOf(value.ampm);
      ampmRef.current?.scrollTo({ top: idxA * ITEM_HEIGHT, behavior: "instant" });
    }
    const idxH = HOUR_OPTIONS.indexOf(value.hour);
    const idxM = MINUTE_OPTIONS.indexOf(value.minute);

    // 위아래에 2개씩 아이템을 추가했어도, 현재 기준이 뷰포트의 5영역 중 가장 첫번째 영역이므로 정상동작함
    hourRef.current?.scrollTo({ top: idxH * ITEM_HEIGHT, behavior: "instant" });
    minRef.current?.scrollTo({ top: idxM * ITEM_HEIGHT, behavior: "instant" });
    requestAnimationFrame(() => {
      isInitializing.current = false;
    });
  }, []);

  useEffect(() => {
    const formatted = ampm ? `${value.ampm} ${value.hour}:${value.minute}` : `${value.hour}:${value.minute}`;
    onChange?.(formatted);
  }, [value, ampm, onChange]);

  const handleScroll = (ref, options, key) => {
    if (isInitializing.current) return;
    const scrollTop = ref.current.scrollTop; // 가운데의 indicator를 기준으로 scroll된 높이를 구해야함
    const idx = Math.round((scrollTop - PADDING) / ITEM_HEIGHT);
    const picked = options[idx];

    if (picked && picked !== value[key]) {
      const next = { ...value, [key]: picked };
      setValue(next);
    }
  };

  const renderColumn = (ref, options, key) => (
    <div className={styles.column} ref={ref} onScroll={() => handleScroll(ref, options, key)}>
      {/* 위쪽 패딩 */}
      <div className={styles.item} />
      <div className={styles.item} />

      {options.map((v) => (
        <div key={v} className={`${styles.item} ${v === value[key] ? styles.selected : ""}`}>
          {v}
        </div>
      ))}

      {/* 아래쪽 패딩 */}
      <div className={styles.item} />
      <div className={styles.item} />
    </div>
  );

  return (
    <div className={styles["time-picker"]}>
      <div className={styles.indicator} />
      {ampm && renderColumn(ampmRef, AMPM_OPTIONS, "ampm")}
      {renderColumn(hourRef, HOUR_OPTIONS, "hour")}
      {renderColumn(minRef, MINUTE_OPTIONS, "minute")}
    </div>
  );
}
