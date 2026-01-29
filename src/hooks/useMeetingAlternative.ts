import { useEffect, useState } from "react";
import type { AlternativeMeeting } from "@/apis/meeting/meetingTypes";
import { calculateDuration, mapToEvents } from "@/utils/meeting/alternative/altTimesParsing";
import type { AlternativeEvent } from "@/types/AlternativeMeetingTypes";

export function useMeetingAlternative(alternativeTimes: AlternativeMeeting[]) {
  const [data, setData] = useState<AlternativeEvent[]>([]);
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!alternativeTimes.length) return;
    setLoading(true);

    const first = new Date(alternativeTimes[0].startTime.split("T")[0]);
    const diff = calculateDuration(alternativeTimes);
    const events = mapToEvents(alternativeTimes);

    setFirstDate(first);
    setDuration(diff);
    setData(events);
    setLoading(false);
  }, [alternativeTimes]);

  return { data, firstDate, duration, loading };
}
