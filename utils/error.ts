import { AxiosError } from "axios";

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    if (typeof error.response?.data === "string") {
      return error.response?.data;
    } else {
      return (
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.response?.data
      );
    }
  }

  return "Something went wrong. Try again later.";
}
