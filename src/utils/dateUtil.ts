import { parseISO, setMinutes, setSeconds, setMilliseconds, getMinutes, getTime } from "date-fns";
//시간을 30분 단위로 내림하는 역할
export const snap30 = (d: Date): Date => {
  const m = Math.floor(getMinutes(d) / 30) * 30;
  return setMilliseconds(setSeconds(setMinutes(d, m), 0), 0);
};
//문자열을 Date단위로 변환
export const toDate = (x: string): Date => parseISO(x);
//keyOf는 “이 startAt~endAt 구간을 고유하게 식별할 수 있는 문자열”을 만들어주는 유틸리티
export const keyOf = (sISO: string, eISO: string) => {
  const s = getTime(setMilliseconds(setSeconds(parseISO(sISO), 0), 0)); //string을 date객체로 변환한 후 정규화(초/milli초제거)
  const e = getTime(setMilliseconds(setSeconds(parseISO(eISO), 0), 0)); //getTime()은 date객체를 UNIX 타임스탬프(ms 단위 숫자)로 변환
  return `${s}|${e}`; //시작시간/종료시간의 고유키 생성
};
