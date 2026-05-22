"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { HiX, HiMinus, HiPlus } from "react-icons/hi";
import type { MenuItem } from "@/lib/menu-types";
import { formatPrice, t } from "@/lib/menu-utils";
import { useCart } from "./CartProvider";

interface MenuItemDetailProps {
  item: MenuItem;
  onClose: () => void;
}

export function MenuItemDetail({ item, onClose }: MenuItemDetailProps) {
  const locale = useLocale();
  const tr = useTranslations("restaurant.item");
  const { addItemWithQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  const handleAdd = () => {
    addItemWithQuantity(item, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <div className="relative mx-auto flex h-full max-w-lg flex-col">
        <div className="relative h-[42vh] min-h-[240px] w-full shrink-0 bg-zinc-900">
          <Image
            src={item.image}
            alt={t(item.name, locale)}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute start-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#f5c518] bg-black/80 text-white shadow-lg transition-transform active:scale-95"
            aria-label={tr("close")}
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-36 pt-5 text-end">
          <h2 className="text-2xl font-bold text-[#e85d04]">{t(item.name, locale)}</h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-800">
            {t(item.description, locale)}
          </p>
          <p className="mt-4 text-2xl font-bold text-emerald-600">
            {formatPrice(item.price, locale)}
          </p>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-[81] mx-auto max-w-lg border-t border-zinc-200 bg-white px-4 py-3 pb-28 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={decrease}
                disabled={quantity <= 1}
                className="qty-btn disabled:opacity-40"
                aria-label={tr("decrease")}
              >
                <HiMinus className="text-lg" />
              </button>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-lg font-bold text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increase}
                className="qty-btn"
                aria-label={tr("increase")}
              >
                <HiPlus className="text-lg" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="min-w-0 flex-1 rounded-xl bg-[#1a6b38] py-3.5 text-center text-base font-bold text-white transition-colors active:bg-[#155a2f]"
            >
              {tr("addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
