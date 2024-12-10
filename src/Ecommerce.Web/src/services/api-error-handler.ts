import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function apiErrorHandler(error: any): void {
  if (axios.isCancel(error)) {
    return;
  }

  if (
    isAxiosError(error) &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    toast.error(
      error.response.data ||
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
    );
    return;
  }

  toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getApiErrorMessage(error: any): string {
  if (axios.isCancel(error)) {
    return "Requisição cancelada";
  }

  if (
    isAxiosError(error) &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return (
      error.response.data ||
      "Ocorreu um erro inesperado. Tente novamente mais tarde."
    );
  }

  return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
}
