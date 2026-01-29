export const CALENDAR = {
  Monthly: "MONTHLY",
  Weekly: "WEEKLY",
} as const;

export type Calendar = (typeof CALENDAR)[keyof typeof CALENDAR];
