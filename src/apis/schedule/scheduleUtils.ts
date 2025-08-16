import { getDate, lastDayOfMonth } from "date-fns";

/**
 * parse target year, month, lastDay for schedule fetching
 */
export const buildRange = (year: string, month: string) => {
  const mm = month.padStart(2, "0");
  const lastDay = String(getDate(lastDayOfMonth(new Date(`${year}-${mm}-01`)))).padStart(2, "0");
  return {
    from: `${year}-${mm}-01T00:00:00`,
    to: `${year}-${mm}-${lastDay}T23:59:59`,
  };
};
