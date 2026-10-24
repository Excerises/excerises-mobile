import moment from "moment";

export function formatSeconds(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}

export function formatDate(
  date?: string,
  { withMinute }: { withMinute?: boolean } = {},
) {
  let format = "DD MMMM YYYY";
  if (withMinute) {
    format += " HH:mm";
  }
  return moment(date).format(format);
}
