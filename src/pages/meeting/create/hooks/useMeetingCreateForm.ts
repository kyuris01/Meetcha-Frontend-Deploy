import { createContext, useContext, useState } from "react";
import {
  meetingCreationSchema,
  type MeetingCreationSchema,
} from "../schemas/meetingCreationSchema";
import type { FormBase, FormSetter } from "@/types/FormValidationBaseTypes";

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

  const [errors, setErrors] = useState<Partial<Record<keyof MeetingCreationSchema, string>> | null>(
    null
  );

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
    setFormData(setter?.defaultValue);
    setErrors(null);
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

export const MeetingCreateFormContext = createContext<FormBase<MeetingCreationSchema>>(null);

export const useMeetingCreateFormContext = () => {
  return useContext(MeetingCreateFormContext);
};
