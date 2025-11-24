export const getMeetingShareLink = (meetingId: string) => {
  return `${import.meta.env.VITE_FRONT_URL}/meeting/link?code=${meetingId}`;
};
