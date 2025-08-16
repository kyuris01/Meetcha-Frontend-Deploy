// import type { Schedule } from "@/apis/schedule/scheduleTypes";
// import { getDate, lastDayOfMonth } from "date-fns";
// import { create } from "zustand";

// export const API_BASE = import.meta.env.VITE_API_BASE_URL;
// const access_token = sessionStorage.getItem("access-token");

// const scheduleCache = new Map<string, Schedule[]>(); // 새로고침 전까지 유지되는 캐시

// interface ScheduleState {
//   scheduleList: Schedule[];
//   fetchSchedules: (args: string, force?: boolean) => Promise<void>;
// }

// export const useScheduleStore = create<ScheduleState>()((set) => ({
//   scheduleList: [],
//   fetchSchedules: async (args, force = false) => {
//     const year = args.split(" ")[0];
//     const month = args.split(" ")[1].padStart(2, "0");
//     const lastDay = String(getDate(lastDayOfMonth(new Date(`${year}-${month}-01`)))).padStart(
//       2,
//       "0"
//     );
//     const cacheKey = `${year}-${month}`;

//     // 1) 캐시 히트: 서버 호출 생략
//     if (!force && scheduleCache.has(cacheKey)) {
//       set({ scheduleList: scheduleCache.get(cacheKey)! });
//       return;
//     }

//     // 2) 캐시 미스 or 강제 새로고침: 서버 호출
//     const res = await fetch(
//       `${API_BASE}/user/schedule?from=${year}-${month}-01T00:00:00&to=${year}-${month}-${lastDay}T23:59:59`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );
//     const data = await res.json();
//     // console.log(data);
//     switch (data.code) {
//       case 200:
//         const list: Schedule[] = data.data;
//         scheduleCache.set(cacheKey, list);
//         set({ scheduleList: list });
//         break;
//       default:
//         alert(data.message);
//         break;
//     }
//   },
// }));
