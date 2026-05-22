"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/menu-types";
import { MenuItemCard } from "./MenuItemCard";
import { MenuItemDetail } from "./MenuItemDetail";
import { useMenuDetail } from "./MenuDetailContext";

interface MenuItemsListProps {
  items: MenuItem[];
}

export function MenuItemsList({ items }: MenuItemsListProps) {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const { setDetailOpen } = useMenuDetail();

  const openItem = (item: MenuItem) => {
    setSelected(item);
    setDetailOpen(true);
  };

  const closeItem = () => {
    setSelected(null);
    setDetailOpen(false);
  };

  return (
    <>
      <section className="space-y-3 px-4 pb-6 pt-2">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onSelect={() => openItem(item)} />
        ))}
      </section>
      {selected && (
        <MenuItemDetail item={selected} onClose={closeItem} />
      )}
    </>
  );
}
