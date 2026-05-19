"use client";

import { useLocale } from "next-intl";
import { SITE_NAME, SITE_NAME_DE } from "@/lib/constants";

export function RestaurantHeader() {
  const locale = useLocale();
  const name = locale === "de" ? SITE_NAME_DE : SITE_NAME;

  return (
    <header className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#f5c518] bg-black text-2xl shadow-lg">
        👨‍🍳
      </div>
      <h1 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-xl">
        {name}
      </h1>
    </header>
  );
}
