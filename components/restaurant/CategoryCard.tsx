"use client";

import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { MenuCategory } from "@/lib/menu-types";
import { t } from "@/lib/menu-utils";

interface CategoryCardProps {
  category: MenuCategory;
  locale: string;
}

export function CategoryCard({ category, locale }: CategoryCardProps) {
  return (
    <Link
      href={`/menu/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-sm transition-transform active:scale-[0.98]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <Image
          src={category.image}
          alt={t(category.name, locale)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="py-3 text-center text-sm font-semibold text-white sm:text-base">
        {t(category.name, locale)}
      </p>
    </Link>
  );
}
