"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/menu-types";
import { MenuItemCard } from "./MenuItemCard";
import { MenuItemDetail } from "./MenuItemDetail";

interface MenuItemsListProps {
  items: MenuItem[];
}

export function MenuItemsList({ items }: MenuItemsListProps) {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <>
      <section className="space-y-3 px-4 pb-6 pt-2">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onSelect={() => setSelected(item)} />
        ))}
      </section>
      {selected && (
        <MenuItemDetail item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
