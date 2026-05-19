"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  RESTAURANT_ADDRESS,
  RESTAURANT_FACEBOOK,
  SITE_NAME,
  SITE_NAME_DE,
} from "@/lib/constants";

export function HomeFooter() {
  const t = useTranslations("restaurant.footer");
  const locale = useLocale();
  const name = locale === "de" ? SITE_NAME_DE : SITE_NAME;
  const address =
    locale === "de" ? RESTAURANT_ADDRESS.de : RESTAURANT_ADDRESS.ar;

  return (
    <footer className="mt-6 space-y-4 px-4 pb-4">
      <div className="rounded-2xl border border-white/10 bg-black/55 p-5 text-center backdrop-blur-sm">
        <p className="text-white">{t("facebookTitle")}</p>
        <p className="mt-1 text-sm text-orange-400">{t("facebookSubtitle")}</p>
        <a
          href={RESTAURANT_FACEBOOK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-xl bg-[#1877f2] px-8 py-2.5 text-sm font-semibold text-white"
        >
          facebook
        </a>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/55 p-5 text-center backdrop-blur-sm">
        <p className="text-orange-400">{t("visit")}</p>
        <p className="mt-2 text-white">{address}</p>
      </div>

      <div className="pt-2 text-center text-sm text-white/80">
        <p>
          {name} © {new Date().getFullYear()}
        </p>
        <p className="mt-1">
          <span>{t("credits")}</span>{" "}
          <span className="text-orange-400">{t("creditsBrand")}</span>
        </p>
      </div>
    </footer>
  );
}
