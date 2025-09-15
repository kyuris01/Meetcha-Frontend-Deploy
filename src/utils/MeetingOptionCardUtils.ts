// UI상의 데이터 표시를 위한 데이터 포맷 로직
export const formatMeetingCardUIData = (type: number, data: string | string[]) => {
  if (type === 1 && Array.isArray(data)) {
    return data.join(", ");
  } else if (type === 3 && typeof data === "string" && data.includes("T")) {
    const [date, time] = data.split("T");
    return `${date} ${time}`;
  } else if (type === 4) {
    if (!data) return;
    const index = data.indexOf(" ");
    return data.slice(index);
  } else {
    return data;
  }
};

export const isPreviousDate = (date: Date) => {
  return date.getTime() < new Date().getTime() && date.getDate() < new Date().getDate();
};
