"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { MenuItem } from "@/lib/menu-types";
import { formatPrice, t } from "@/lib/menu-utils";

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: () => void;
}

export function MenuItemCard({ item, onSelect }: MenuItemCardProps) {
  const locale = useLocale();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="flex w-full cursor-pointer gap-3 rounded-2xl bg-white p-3 text-start shadow-md transition-shadow active:shadow-sm"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={t(item.name, locale)}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="font-bold text-zinc-900">{t(item.name, locale)}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">
            {t(item.description, locale)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-emerald-600">
            {formatPrice(item.price, locale)}
          </span>
          <span className="flex h-9 w-12 items-center justify-center rounded-lg bg-red-600 text-xl font-bold text-white">
            +
          </span>
        </div>
      </div>
    </article>
  );
}
