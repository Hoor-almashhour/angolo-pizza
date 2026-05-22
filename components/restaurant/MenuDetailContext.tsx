"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface MenuDetailContextValue {
  isDetailOpen: boolean;
  setDetailOpen: (open: boolean) => void;
}

const MenuDetailContext = createContext<MenuDetailContextValue | null>(null);

export function MenuDetailProvider({ children }: { children: React.ReactNode }) {
  const [isDetailOpen, setDetailOpen] = useState(false);

  const value = useMemo(
    () => ({ isDetailOpen, setDetailOpen }),
    [isDetailOpen]
  );

  return (
    <MenuDetailContext.Provider value={value}>{children}</MenuDetailContext.Provider>
  );
}

export function useMenuDetail() {
  const ctx = useContext(MenuDetailContext);
  if (!ctx) throw new Error("useMenuDetail must be used within MenuDetailProvider");
  return ctx;
}
