import { differenceInDays } from "date-fns";
import type { AlternativeMeeting } from "@/apis/meeting/meetingTypes";

export function calculateDuration(alternativeTimes: AlternativeMeeting[]): number {
  const first = new Date(alternativeTimes[0]?.startTime.split("T")[0]);
  const last = new Date(alternativeTimes[alternativeTimes.length - 1]?.startTime.split("T")[0]);
  return differenceInDays(last, first) + 3;
}

export function mapToEvents(alternativeTimes: AlternativeMeeting[]) {
  return alternativeTimes.map((item, index) => ({
    title: "---",
    start: item?.startTime,
    end: item?.endTime,
    extendedProps: {
      index,
      failMembers: item.excludedUserNames,
      adjustedTime: item.adjustedDurationMinutes,
      startTime: item?.startTime.split("T")[1],
      endTime: item?.endTime.split("T")[1],
      availableNum: item.includedUserNames.length,
      totalNum: item.includedUserNames.length + item.excludedUserNames.length,
      date: item?.startTime.split("T")[0],
    },
  }));
}
