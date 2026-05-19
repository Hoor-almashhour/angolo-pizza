"use client";

import { useTranslations } from "next-intl";
import { HiPhone, HiLocationMarker, HiPlay } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import {
  RESTAURANT_LOCATION_URL,
  RESTAURANT_PHONE,
  RESTAURANT_VIDEO,
  RESTAURANT_WHATSAPP,
} from "@/lib/constants";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const items = [
  { key: "call" as const, href: `tel:${RESTAURANT_PHONE}`, icon: HiPhone, external: false },
  {
    key: "whatsapp" as const,
    href: RESTAURANT_WHATSAPP,
    icon: FaWhatsapp,
    external: true,
  },
  {
    key: "location" as const,
    href: RESTAURANT_LOCATION_URL,
    icon: HiLocationMarker,
    external: true,
  },
  {
    key: "video" as const,
    href: RESTAURANT_VIDEO,
    icon: HiPlay,
    external: true,
  },
] as const;

export function SideMenu({ open, onClose }: SideMenuProps) {
  const t = useTranslations("restaurant.sideMenu");

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={t("close")}
      />
      <aside className="fixed end-0 top-1/2 z-[70] flex -translate-y-1/2 flex-col gap-3 rounded-s-2xl bg-black/95 py-4 pe-2 ps-3 shadow-[-8px_0_30px_rgba(0,0,0,0.5)]">
        {items.map(({ key, href, icon: Icon, external }) => (
          <a
            key={key}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="flex flex-col items-center gap-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5c518] text-black shadow-md transition-transform active:scale-95">
              <Icon className="text-xl" />
            </span>
            <span className="text-[11px] font-medium text-white">{t(key)}</span>
          </a>
        ))}
      </aside>
    </>
  );
}
