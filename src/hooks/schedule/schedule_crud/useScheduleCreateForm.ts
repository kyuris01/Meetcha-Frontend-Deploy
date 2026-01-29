import type { FormBase, FormSetter } from "@/hooks/meeting/create/useMeetingCreateForm";
import {
  scheduleCreationSchema,
  type ScheduleCreationSchema,
} from "../../../schemas/scheduleCreationSchema";
import { createContext, useContext, useState } from "react";

export const useScheduleCreateForm = (
  setter?: FormSetter<ScheduleCreationSchema>
): FormBase<ScheduleCreationSchema> => {
  const [formData, setFormData] = useState<ScheduleCreationSchema>(
    setter?.defaultValue ?? {
      title: "",
      startAt: "",
      endAt: "",
      recurrence: "",
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof ScheduleCreationSchema, string>> | undefined
  >(undefined);

  const formDataSetter = (
    key: keyof ScheduleCreationSchema,
    value: ScheduleCreationSchema[keyof ScheduleCreationSchema]
  ) => {
    setFormData((prev) => {
      if (prev[key] === value) return prev; // 변경 없으면 rerender 방지
      return { ...prev, [key]: value };
    });
  };

  const getFormValue = <K extends keyof ScheduleCreationSchema>(key: K) => {
    return formData[key];
  };

  const setError = (key: keyof ScheduleCreationSchema, reason: string) => {
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
    setFormData(setter?.defaultValue as ScheduleCreationSchema);
    setErrors(undefined);
  };

  return {
    values: formData,
    setFormValue: formDataSetter,
    setError,
    errors,
    onSubmit: (callback) => {
      const result = scheduleCreationSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          result.error.issues.reduce(
            (acc, issue) => {
              acc[issue.path[0] as keyof ScheduleCreationSchema] = issue.message;
              return acc;
            },
            {} as Partial<Record<keyof ScheduleCreationSchema, string>>
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

export const ScheduleCreateFormContext = createContext<
  FormBase<ScheduleCreationSchema> | undefined
>(undefined);

export const useScheduleCreateFormContext = () => {
  const ctx = useContext(ScheduleCreateFormContext);
  if (!ctx) throw new Error("Must be used within ScheduleCreateFormContext.Provider");
  return ctx;
};
