"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuItem } from "@/lib/menu-types";

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  addItemWithQuantity: (item: MenuItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nour-alsham-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItemWithQuantity = useCallback((item: MenuItem, quantity: number) => {
    if (quantity < 1) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const addItem = useCallback(
    (item: MenuItem) => addItemWithQuantity(item, 1),
    [addItemWithQuantity]
  );

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => {
      const line = prev.find((l) => l.item.id === itemId);
      if (!line) return prev;
      if (line.quantity <= 1) return prev.filter((l) => l.item.id !== itemId);
      return prev.map((l) =>
        l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l
      );
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const totalPrice = useMemo(
    () => lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      totalCount,
      totalPrice,
      addItem,
      addItemWithQuantity,
      removeItem,
      clearCart,
      isOpen,
      setIsOpen,
    }),
    [lines, totalCount, totalPrice, addItem, addItemWithQuantity, removeItem, clearCart, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
