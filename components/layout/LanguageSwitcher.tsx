"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { LOCALE_COOKIE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const locales = [
  { code: "ar", label: "عربي" },
  { code: "de", label: "DE" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000`;
    try {
      localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      /* ignore */
    }
    router.replace(pathname, { locale: next });
  }

  return (
    <motion.div
      className={cn("flex items-center gap-1 rounded-full glass p-1", className)}
      role="group"
      aria-label="Language switcher"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            locale === code
              ? "bg-accent-purple/30 text-foreground"
              : "text-muted hover:text-foreground"
          )}
          aria-pressed={locale === code}
          aria-label={code === "ar" ? "Arabic" : "German"}
        >
          {label}
        </button>
      ))}
    </motion.div>
  );
}
