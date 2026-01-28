import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTextual(
  dateString: string | Date,
  dateTime: boolean = false,
): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(dateTime && { hour: "numeric", minute: "numeric" }),
  });
}

export function formatDate(
  dateString: string | Date,
  dateTime: boolean = false,
): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(dateTime && { hour: "numeric", minute: "numeric" }),
  });
}
