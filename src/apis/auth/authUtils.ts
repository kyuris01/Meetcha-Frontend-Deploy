export const getResponseType = (code: number) => {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "clientError";
  if (code >= 500 && code < 600) return "serverError";
  return "other";
};

export const isSuccess = (code: number) => {
  return code >= 200 && code < 300;
};
