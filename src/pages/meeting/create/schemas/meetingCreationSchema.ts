import dayjs from "dayjs";
import { z } from "zod";

/**
 * 미팅 생성 폼 스키마
 * - 검증 트리거
 * ```
 * const result =meetingCreationSchema.safeParse(data);
 * ```
 * - 성공 여부
 * ```
 * result.success; // true if valid, false if invalid
 * ```
 * - 에러 접근
 * ```
 * // success가 false여야함
 * result.error; // zod.ZodError
 * result.error.issues; // zod.ZodIssue[]
 * result.error.issues.map((issue) => issue.message); // string[]
 * ```
 * - 특정 필드에 대해서만 검증 (둘중 아무거나)
 * ```
 * meetingCreationSchema.shape.title.parse(data)
 * meetingCreationSchema.pick({
 *  필드명: boolean
 * }).parse(data)
 * ```
 * 주의: DO NOT USE TRANSFORM, 이 스키마는 검증 책임만 존재
 */
const meetingCreationSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "제목을 입력해주세요" })
      .max(100, { message: "제목은 100자 이하로 입력해주세요" }),
    description: z.string().max(200, { message: "설명은 200자 이하로 입력해주세요" }).optional(),
    /**
     * YYYY-MM-DD[]
     */
    candidateDates: z
      .array(z.string())
      .min(1, { message: "후보 날짜를 선택해주세요" })
      .max(10, { message: "후보 날짜는 10개 이하로 선택해주세요" })
      .refine(
        (value) => {
          return value.every((date) => {
            return dayjs(date).isValid();
          });
        },
        { message: "올바르지 않은 형식입니다." }
      ),
    /**
     * H(H):MM -> number
     */
    durationMinutes: z
      .number()
      .min(1, { message: "진행 시간을 선택해주세요" })
      .max(1440, { message: "올바르지 않은 형식입니다." }),
    /**
     * YYYY-MM-DDTH(H):MM <- TODO: H하나면 native Date객체 기준 Invalid Date임
     */
    deadline: z
      .string()
      .min(1, { message: "투표 마감 시간을 선택해주세요" })
      .refine(
        (value) => {
          return dayjs(value).isValid();
        },
        { message: "올바르지 않은 형식입니다." }
      ),
    projectId: z.string().optional(),
  })
  .superRefine((value, context) => {
    // 후보날짜와 데드라인 관계 검증
    if (value.candidateDates.some((date) => dayjs(date).isBefore(dayjs(value.deadline)))) {
      context.addIssue({
        code: "custom",
        message: "후보날짜는 참여 마감 시간 이후여야 합니다.",
        path: ["candidateDates", "deadline"],
      });
    }
  });

/**
 * 미팅 생성 폼 스키마 타입
 * - 만약 각 필드에 대해 접근 원한다면
 * ```
 * type Deadline = MeetingCreationSchema["deadline"];
 * ```
 */
export type MeetingCreationSchema = z.infer<typeof meetingCreationSchema>;

/**
 * 서버로 보낼 데이터 형식
 */
export interface MeetingSendData {
  title: string;
  description?: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: string;
  projectId?: string;
}

export { meetingCreationSchema };
