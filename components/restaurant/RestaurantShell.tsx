"use client";

import { useState } from "react";
import Image from "next/image";
import { RESTAURANT_BG } from "@/lib/constants";
import { CartProvider } from "./CartProvider";
import { MenuDetailProvider, useMenuDetail } from "./MenuDetailContext";
import { BottomNav } from "./BottomNav";
import { SideMenu } from "./SideMenu";
import { LanguageMenu } from "./LanguageMenu";
import { CartDrawer } from "./CartDrawer";
import { RestaurantHeader } from "./RestaurantHeader";

function RestaurantShellInner({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { isDetailOpen } = useMenuDetail();

  return (
    <div className="relative min-h-screen pb-28">
      <div className="fixed inset-0 -z-10">
        <Image
          src={RESTAURANT_BG}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
      </div>

      {!isDetailOpen && <RestaurantHeader />}
      {children}
        <BottomNav
          onOpenSideMenu={() => {
            setLangOpen(false);
            setSideOpen(true);
          }}
          onOpenLanguageMenu={() => {
            setSideOpen(false);
            setLangOpen(true);
          }}
        />
        <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />
        <LanguageMenu open={langOpen} onClose={() => setLangOpen(false)} />
      <CartDrawer />
    </div>
  );
}

export function RestaurantShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <MenuDetailProvider>
        <RestaurantShellInner>{children}</RestaurantShellInner>
      </MenuDetailProvider>
    </CartProvider>
  );
}
