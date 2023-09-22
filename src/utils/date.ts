import dayjs from "dayjs";

export const formatDate = (time: number): string => {
  return dayjs.unix(time).format("YYYY-MM-DD, HH:mm");
};
