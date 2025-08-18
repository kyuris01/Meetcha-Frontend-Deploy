import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Schedule } from "@/apis/schedule/scheduleTypes";
import { fetchSchedules, scheduleKeys } from "@/apis/schedule/scheduleAPI";

export function useSchedules(year, month) {
  const qc = useQueryClient();

  const query = useQuery<Schedule[]>({
    queryKey: scheduleKeys.month(year, month),
    queryFn: () => fetchSchedules(year, month),
    placeholderData: (prev) => prev,
    staleTime: 60_000 * 5, // 1분 동안 신선
    gcTime: 30 * 60_000, // 30분 후 메모리에서 제거
  });

  const forceRefresh = () => qc.invalidateQueries({ queryKey: scheduleKeys.month(year, month) });

  return { ...query, forceRefresh };
}
