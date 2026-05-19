"use client";

import { useState } from "react";
import Image from "next/image";
import { RESTAURANT_BG } from "@/lib/constants";
import { CartProvider } from "./CartProvider";
import { BottomNav } from "./BottomNav";
import { SideMenu } from "./SideMenu";
import { CartDrawer } from "./CartDrawer";
import { RestaurantHeader } from "./RestaurantHeader";

export function RestaurantShell({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <CartProvider>
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

        <RestaurantHeader />
        {children}
        <BottomNav onOpenSideMenu={() => setSideOpen(true)} />
        <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
