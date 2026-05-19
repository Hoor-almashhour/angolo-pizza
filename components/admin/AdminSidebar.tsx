"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FiGrid,
  FiFolder,
  FiLayers,
  FiImage,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/services", label: "Services", icon: FiLayers },
  { href: "/admin/media", label: "Media", icon: FiImage },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#0a0a0f] p-4">
      <div className="mb-8 px-2">
        <p className="text-lg font-semibold text-white">Admin Panel</p>
        <p className="text-xs text-zinc-500">Angolo della CMS</p>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Admin navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              pathname === href
                ? "bg-violet-600/20 text-violet-300"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
