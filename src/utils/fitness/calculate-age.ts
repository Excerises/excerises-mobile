import moment from "moment";

export function calculateAge(date: string | Date) {
  return Math.abs(moment(date).diff(moment(), "year"));
}
