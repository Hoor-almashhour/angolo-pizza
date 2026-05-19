import type { LocalizedText } from "./menu-types";

export function t(text: LocalizedText, locale: string): string {
  return locale === "de" ? text.de : text.ar;
}

export function formatPrice(price: number, locale: string): string {
  return locale === "de" ? `${price.toFixed(0)} ₺` : `${price.toFixed(0)}₺`;
}
