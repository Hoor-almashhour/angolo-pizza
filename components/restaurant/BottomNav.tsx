"use client";

import { useLocale, useTranslations } from "next-intl";
import { HiHome, HiShoppingCart, HiGlobeAlt } from "react-icons/hi";
import { FaUtensils } from "react-icons/fa";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { useCart } from "./CartProvider";
import type { Locale } from "@/lib/i18n/routing";

interface BottomNavProps {
  onOpenSideMenu: () => void;
}

export function BottomNav({ onOpenSideMenu }: BottomNavProps) {
  const t = useTranslations("restaurant.nav");
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { totalCount, setIsOpen } = useCart();
  const otherLocale: Locale = locale === "ar" ? "de" : "ar";

  const isHome = pathname === "/";
  const isMenu = pathname.startsWith("/menu");

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg">
      <div className="relative mx-2 mb-2">
        <CartFab totalCount={totalCount} setIsOpen={setIsOpen} label={t("cart")} />

        <div className="flex items-center justify-between rounded-t-[2rem] bg-black px-3 pb-3 pt-8 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
          <button
            type="button"
            onClick={switchLocale}
            className="nav-icon-btn"
            aria-label={t("language")}
          >
            <HiGlobeAlt className="text-xl" />
          </button>

          <button
            type="button"
            onClick={onOpenSideMenu}
            className="nav-icon-btn text-2xl font-black leading-none"
            aria-label={t("more")}
          >
            !
          </button>

          <div className="w-14" aria-hidden />

          <Link
            href="/menu/shawarma"
            className={`nav-icon-btn ${isMenu ? "ring-2 ring-[#f5c518]" : ""}`}
            aria-label={t("menu")}
          >
            <FaUtensils className="text-lg" />
          </Link>

          <Link
            href="/"
            className={`nav-icon-btn ${isHome ? "ring-2 ring-[#f5c518]" : ""}`}
            aria-label={t("home")}
          >
            <HiHome className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function CartFab({
  totalCount,
  setIsOpen,
  label,
}: {
  totalCount: number;
  setIsOpen: (open: boolean) => void;
  label: string;
}) {
  return (
    <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f5c518] shadow-[0_-4px_20px_rgba(0,0,0,0.4)] transition-transform active:scale-95"
        aria-label={label}
      >
        <HiShoppingCart className="text-3xl text-black" />
        {totalCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}
