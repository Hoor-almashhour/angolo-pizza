import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

import ar from "../../messages/ar.json";
import de from "../../messages/de.json";

const messagesMap = {
  ar,
  de,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "ar" | "de")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messagesMap[locale as "ar" | "de"],
  };
});