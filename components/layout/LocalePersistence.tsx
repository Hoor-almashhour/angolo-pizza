"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { LOCALE_COOKIE } from "@/lib/constants";

export function LocalePersistence() {
  const locale = useLocale();

  useEffect(() => {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000`;
    try {
      localStorage.setItem(LOCALE_COOKIE, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE);
      if (stored && stored !== locale) {
        document.cookie = `${LOCALE_COOKIE}=${stored};path=/;max-age=31536000`;
      }
    } catch {
      /* ignore */
    }
  }, [locale]);

  return null;
}
