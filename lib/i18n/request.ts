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

  // 🔥 حماية قوية ضد undefined
  if (!locale || !["ar", "de"].includes(locale)) {
    locale = routing.defaultLocale;
  }

  const safeLocale = locale as "ar" | "de";

  return {
    locale: safeLocale,
    messages: messagesMap[safeLocale],
  };
});