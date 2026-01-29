import type {
  MeetingCreationSchema,
  MeetingSendData,
} from "../../../schemas/meetingCreationSchema";

/*
 * 폼 데이터를 서버에 적합한 형태로 정제
 * TODO: parse함수에서 검증 로직은 따로 분리해야함, zod쓰겠지~
 */
export const meetingFormDataConvert = (formData: MeetingCreationSchema): MeetingSendData => {
  /**
   * 이거 먼가요? 나중에 누가 설명점
   */
  const projectDataParse = (projectId: MeetingCreationSchema["projectId"]) => {
    if (!projectId) return undefined;
    const index = projectId.indexOf(" ");
    return projectId.slice(0, index);
  };

  const deadlineParse = (deadline: MeetingCreationSchema["deadline"]) => {
    if (!deadline) return undefined;
    if (!deadline.includes("T")) return undefined;
    const [date, time] = deadline.split("T");
    const [hour, minute] = time.split(":");
    const paddedTime = hour?.padStart(2, "0") + ":" + minute;
    return date + "T" + paddedTime;
  };

  return {
    ...formData,
    deadline: deadlineParse(formData.deadline) as string,
    projectId: formData.projectId ? projectDataParse(formData.projectId) : undefined,
  };
};
