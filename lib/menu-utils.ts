import type { LocalizedText } from "./menu-types";

export function t(text: LocalizedText, locale: string): string {
  return locale === "de" ? text.de : text.ar;
}

export function formatPrice(price: number, _locale: string): string {
  const value = Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
  return `${value} €`;
}
