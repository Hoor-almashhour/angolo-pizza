import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
