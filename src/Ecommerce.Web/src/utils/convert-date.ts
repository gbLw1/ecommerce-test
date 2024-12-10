import moment from "moment";

export const convertDate = (date: string, format?: string | null): string => {
  return moment(date).format(format || "DD/MM/YYYY");
};
