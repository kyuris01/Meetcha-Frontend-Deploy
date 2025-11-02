import { isAfter, isValid, parseISO } from "date-fns";
import { z } from "zod";

const scheduleCreationSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "제목을 입력해주세요." })
      .max(40, { message: "제목은 40자 이하로 입력해주세요." }),
    startAt: z
      .string()
      .min(1, { message: "일정 시작일을 선택해주세요." })
      .refine(
        (value) => {
          const parsedDate = parseISO(value);
          return isValid(parsedDate);
        },
        { message: "올바르지 않은 형식입니다." }
      ),
    endAt: z
      .string()
      .min(1, { message: "일정 마감일을 선택해주세요." })
      .refine(
        (value) => {
          const parsedDate = parseISO(value);
          return isValid(parsedDate);
        },
        { message: "올바르지 않은 형식입니다." }
      ),
    recurrence: z.string().min(1, { message: "반복 주기를 선택해주세요." }),
  })
  .superRefine((value, context) => {
    const start = parseISO(value.startAt);
    const end = parseISO(value.endAt);
    if (isAfter(start, end)) {
      context.addIssue({
        code: "custom",
        message: "일정 시작일은 일정 마감일 이전이어야 합니다.",
        path: ["startDate", "endDate"],
      });
    }
  });

/**
 * 일정 생성 폼 스키마 타입
 */
export type ScheduleCreationSchema = z.infer<typeof scheduleCreationSchema>;

/**
 * recurrence 필드의 타입
 */
// const RECURRENCE = ["NONE", "DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"] as const;
// export type Recurrence = (typeof RECURRENCE)[number];

export const RECURRENCE = {
  None: "NONE",
  Daily: "DAILY",
  Weekly: "WEEKLY",
  Biweekly: "BIWEEKLY",
  Monthly: "MONTHLY",
} as const;
export type Recurrence = (typeof RECURRENCE)[keyof typeof RECURRENCE];

/**
 * 서버로 보낼 데이터 형식
 */
export interface ScheduleCreationData {
  title: string;
  startAt: string;
  endAt: string;
  recurrence: Recurrence;
}

export { scheduleCreationSchema };
