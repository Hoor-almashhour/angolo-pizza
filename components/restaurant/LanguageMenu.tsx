"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";

interface LanguageMenuProps {
  open: boolean;
  onClose: () => void;
}

const locales: {
  code: Locale;
  labelKey: "arabic" | "german";
  icon: string;
}[] = [
  { code: "ar", labelKey: "arabic", icon: "ع" },
  { code: "de", labelKey: "german", icon: "DE" },
];

export function LanguageMenu({ open, onClose }: LanguageMenuProps) {
  const t = useTranslations("restaurant.languageMenu");
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  if (!open) return null;

  const selectLocale = (locale: Locale) => {
    if (locale !== currentLocale) {
      router.replace(pathname, { locale });
    }
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={t("close")}
      />
      <aside className="fixed end-0 top-1/2 z-[70] flex -translate-y-1/2 flex-col gap-3 rounded-s-2xl bg-black/95 py-4 pe-2 ps-3 shadow-[-8px_0_30px_rgba(0,0,0,0.5)]">
        {locales.map(({ code, labelKey, icon }) => {
          const isActive = code === currentLocale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => selectLocale(code)}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#f5c518] text-black shadow-md transition-transform active:scale-95 ${
                  isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
                }`}
              >
                <span className="text-lg font-bold leading-none">{icon}</span>
              </span>
              <span className="max-w-[72px] text-center text-[11px] font-medium leading-tight text-white">
                {t(labelKey)}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
