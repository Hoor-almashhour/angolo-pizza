import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  getCategoryBySlug,
  getItemsByCategory,
  getMenuCategories,
} from "@/lib/menu";

import { CategoryTabs } from "@/components/restaurant/CategoryTabs";
import { MenuItemsList } from "@/components/restaurant/MenuItemsList";

export async function generateStaticParams() {
  const categories = await getMenuCategories();

  return categories.map((c) => ({
    slug: c.slug,
  }));
}

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function MenuCategoryPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const [categories, category] = await Promise.all([
    getMenuCategories(),
    getCategoryBySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  const items = await getItemsByCategory(category.id);

  return (
    <div className="relative z-10 mx-auto max-w-lg bg-zinc-100/95 min-h-[calc(100vh-7rem)] rounded-t-3xl">
      <CategoryTabs
        categories={categories}
        locale={locale}
        activeSlug={slug}
      />

      {items.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">
          {locale === "de" ? "Keine Artikel" : "لا توجد أصناف"}
        </p>
      ) : (
        <MenuItemsList items={items} />
      )}
    </div>
  );
}