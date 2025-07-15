// TimePicker.jsx
import { useRef, useEffect, useState } from "react";
import styles from "./TimePicker.module.scss";

const AMPM_OPTIONS = ["오전", "오후"];
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

// SCSS 변수 $item-height 과 반드시 동일
const ITEM_HEIGHT = 40;

export default function TimePicker({ onChange }) {
  const [value, setValue] = useState({ ampm: "오전", hour: "12", minute: "02" }); // 현재 선택된 값
  const ampmRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);

  // 마운트 시 초기 스크롤 위치 맞추기
  useEffect(() => {
    const idxA = AMPM_OPTIONS.indexOf(value.ampm);
    const idxH = HOUR_OPTIONS.indexOf(value.hour);
    const idxM = MINUTE_OPTIONS.indexOf(value.minute);

    // 위아래에 2개씩 아이템을 추가했어도, 현재 기준이 뷰포트의 5영역 중 가장 첫번째 영역이므로 정상동작함
    ampmRef.current?.scrollTo({ top: idxA * ITEM_HEIGHT, behavior: "instant" });
    hourRef.current?.scrollTo({ top: idxH * ITEM_HEIGHT, behavior: "instant" });
    minRef.current?.scrollTo({ top: idxM * ITEM_HEIGHT, behavior: "instant" });
  }, []);

  const handleScroll = (ref, options, key) => {
    const scrollTop = ref.current.scrollTop; // 가운데의 indicator를 기준으로 scroll된 높이를 구해야함
    const idx = Math.round(scrollTop / ITEM_HEIGHT);
    const picked = options[idx];
    // console.log(scrollTop, idx, picked);
    if (picked && picked !== value[key]) {
      const next = { ...value, [key]: picked };
      setValue(next);
      onChange?.(`${next.ampm} ${next.hour}:${next.minute}`);
    }
  };

  return (
    <div className={styles["time-picker"]}>
      <div className={styles.indicator} />
      <div
        className={styles.column}
        ref={ampmRef}
        onScroll={() => handleScroll(ampmRef, AMPM_OPTIONS, "ampm")}
      >
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        {AMPM_OPTIONS.map((v) => (
          <div
            key={v}
            className={`${styles.item} ${v === value.ampm ? styles.selected : ""}`.trim()}
          >
            {v}
          </div>
        ))}
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>

      <div
        className={styles.column}
        ref={hourRef}
        onScroll={() => handleScroll(hourRef, HOUR_OPTIONS, "hour")}
      >
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        {HOUR_OPTIONS.map((v) => (
          <div
            key={v}
            className={`${styles.item} ${v === value.hour ? styles.selected : ""}`.trim()}
          >
            {v}
          </div>
        ))}
        {/* 맨 아래 요소도 가운데에 올 수 있게끔 하기위한 빈 아이템 */}
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>

      <div
        className={styles.column}
        ref={minRef}
        onScroll={() => handleScroll(minRef, MINUTE_OPTIONS, "minute")}
      >
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        {MINUTE_OPTIONS.map((v) => (
          <div
            key={v}
            className={`${styles.item} ${v === value.minute ? styles.selected : ""}`.trim()}
          >
            {v}
          </div>
        ))}
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  );
}
