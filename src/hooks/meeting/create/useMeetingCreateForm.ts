import { createContext, useContext, useState } from "react";
import { meetingCreationSchema, type MeetingCreationSchema } from "@/schemas/meetingCreationSchema";

export type SetError<Schema> = (field: keyof Schema, reason: string) => void;

export interface FormBase<Schema> {
  /**
   * 폼 필드 하나의 값을 세팅
   */
  setFormValue: <K extends keyof Schema>(field: K, value: Schema[K]) => void;
  /**
   * 전체 폼 값
   */
  values: Schema;
  /**
   * 필드 하나의 폼 데이터 가져옴
   */
  getFormValue: <K extends keyof Schema>(field: K) => Schema[K];
  /**
   * 필드별 폼 에러와 에러 메시지, 서버 에러는 관여안함, 일단 필드당 에러는 하나만 설정
   */
  errors?: Partial<Record<keyof Schema, string>>;
  /**
   * 에러 트리거
   */
  setError: SetError<Schema>;
  /**
   * 에러뜨면 폼 제출 안함
   */
  onSubmit: (callback: () => void) => void;
  /**
   * 폼 데이터랑 에러 다 없앰
   */
  clearForm: () => void;
}

export interface FormSetter<Schema> {
  /**
   * 기본값, 일단 지금은 필요없음
   */
  defaultValue?: Schema;
}

/**
 * TODO: 이것도 zod 적용하면 갈아 엎어야함
 */
export const useMeetingCreateForm = (
  setter?: FormSetter<MeetingCreationSchema>
): FormBase<MeetingCreationSchema> => {
  // 왜 optional chaining 걸었는데 type err안뜸
  const [formData, setFormData] = useState<MeetingCreationSchema>(
    setter?.defaultValue ?? {
      title: "",
      candidateDates: [],
      durationMinutes: 0,
      deadline: "",
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof MeetingCreationSchema, string>> | undefined
  >(undefined);

  const formDataSetter = (
    key: keyof MeetingCreationSchema,
    value: MeetingCreationSchema[keyof MeetingCreationSchema]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFormValue = <K extends keyof MeetingCreationSchema>(key: K) => {
    return formData[key];
  };

  const setError = (key: keyof MeetingCreationSchema, reason: string) => {
    if (errors) {
      setErrors((prev) => ({
        ...prev,
        [key]: reason,
      }));
    } else {
      setErrors({
        [key]: reason,
      });
    }
  };

  const clearForm = () => {
    setFormData(setter?.defaultValue as MeetingCreationSchema);
    setErrors(undefined);
  };

  return {
    values: formData,
    setFormValue: formDataSetter,
    setError,
    errors,
    onSubmit: (callback) => {
      const result = meetingCreationSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          result.error.issues.reduce(
            (acc, issue) => {
              acc[issue.path[0] as keyof MeetingCreationSchema] = issue.message;
              return acc;
            },
            {} as Partial<Record<keyof MeetingCreationSchema, string>>
          )
        );
        return;
      }
      callback();
    },
    getFormValue,
    clearForm,
  };
};

export const MeetingCreateFormContext = createContext<FormBase<MeetingCreationSchema> | undefined>(
  undefined
);

export const useMeetingCreateFormContext = () => {
  const ctx = useContext(MeetingCreateFormContext);
  if (!ctx) throw new Error("Must be used within MeetingCreateFormContext.Provider");
  return ctx;
};
