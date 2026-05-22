"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

export function RestaurantHeader() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="relative z-20 flex w-full items-center gap-4 px-4 pt-4 pb-2 ltr:justify-between rtl:justify-start"
    >
      <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#f5c518] bg-black shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:h-[92px] sm:w-[92px]">
        <Image
          src="/logo.png"
          alt="Angolo Della Pizza"
          fill
          className="object-contain p-2.5"
          sizes="250px"
          priority
        />
      </div>

      <h1 className="min-w-0 flex-1 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ltr:text-end rtl:text-end">
        <span className="block text-xl font-bold text-[#f5c518] sm:text-2xl">
          Angolo Della
          <span className="pl-2  text-lg font-bold text-white sm:text-2xl">Pizza</span>
        </span>
      </h1>
    </header>
  );
}
