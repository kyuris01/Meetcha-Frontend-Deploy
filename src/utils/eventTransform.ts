//구글 캘린더에 이미 있는 일정...,선택된 일정들 fullcalendar에서 쓰기 위해 데이터 변환
import { parseISO } from "date-fns";
import type { UserScheduleData, EventWithColor } from "@/apis/participate/participateTypes";
interface BusyEvent {
  start: Date;
  end: Date;
  display: string;
  classNames: string[];
  extendedProps: Record<string, boolean>;
}

interface SelectedEvent {
  start: string;
  end: string;
  display: string;
  backgroundColor: string;
  classNames: string[];
  extendedProps: Record<string, boolean>;
}
//사용자의 구글캘린더 일정 정보 불러와 데이터 재설정
export const toBusyEvents = (scheduleData: UserScheduleData[] | null): BusyEvent[] =>
  scheduleData.map((ev) => ({
    start: parseISO(ev.startAt),
    end: parseISO(ev.endAt),
    display: "background",
    classNames: ["busy-block"],
    extendedProps: { isBusy: true },
  })); //결과는 toBusyEvents는 이러한 데이터 형식가진 배열

//색 6개 중에 번갈아 가면서 설정

//내가 select한 일정들에 대해서 데이터 재설정->fullcalendar 렌더링을 위함
export const toSelectedEvents = (selectedEventsWithColor: EventWithColor[]): SelectedEvent[] =>
  selectedEventsWithColor.map((time) => ({
    start: time.start,
    end: time.end,
    display: "auto",
    backgroundColor: time.color,
    classNames: ["selected-block"],
    extendedProps: { isBusy: false },
  }));
