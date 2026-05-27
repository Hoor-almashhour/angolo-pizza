import { setRequestLocale } from "next-intl/server";

import { getMenuCategories } from "@/lib/menu";
import { CategoryCard } from "@/components/restaurant/CategoryCard";
import { HomeFooter } from "@/components/restaurant/HomeFooter";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  setRequestLocale(locale);

  const categories = await getMenuCategories();

  return (
    <div className="relative z-10 mx-auto max-w-lg">
      <section className="grid grid-cols-2 gap-3 px-4 pb-2 pt-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            locale={locale}
          />
        ))}
      </section>

      <HomeFooter />
    </div>
  );
}