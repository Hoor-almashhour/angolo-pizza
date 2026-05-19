"use client";

import { useLocale, useTranslations } from "next-intl";
import { HiX, HiMinus, HiPlus } from "react-icons/hi";
import { useCart } from "./CartProvider";
import { formatPrice, t } from "@/lib/menu-utils";

export function CartDrawer() {
  const tr = useTranslations("restaurant.cart");
  const locale = useLocale();
  const { lines, isOpen, setIsOpen, removeItem, addItem, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      />
      <aside className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-h-[75vh] max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl">
        <CartDrawerHeader tr={tr} setIsOpen={setIsOpen} clearCart={clearCart} lines={lines} />
        <div className="max-h-[50vh] overflow-y-auto px-4 pb-6">
          {lines.length === 0 ? (
            <p className="py-8 text-center text-zinc-500">{tr("empty")}</p>
          ) : (
            <ul className="space-y-3">
              {lines.map(({ item, quantity }) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-zinc-900">{t(item.name, locale)}</p>
                    <p className="text-sm text-emerald-600">
                      {formatPrice(item.price, locale)} × {quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100"
                    >
                      <HiMinus />
                    </button>
                    <span className="w-6 text-center font-bold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c518]"
                    >
                      <HiPlus />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-zinc-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{tr("total")}</span>
              <span className="text-xl font-bold text-emerald-600">
                {formatPrice(totalPrice, locale)}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function CartDrawerHeader({
  tr,
  setIsOpen,
  clearCart,
  lines,
}: {
  tr: (key: string) => string;
  setIsOpen: (v: boolean) => void;
  clearCart: () => void;
  lines: unknown[];
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 p-4">
      <h2 className="text-lg font-bold">{tr("title")}</h2>
      <div className="flex gap-2">
        {lines.length > 0 && (
          <button type="button" onClick={clearCart} className="text-sm text-red-600">
            {tr("clear")}
          </button>
        )}
        <button type="button" onClick={() => setIsOpen(false)}>
          <HiX className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
