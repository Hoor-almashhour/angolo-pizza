import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "de"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
