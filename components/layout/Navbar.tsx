"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { EASING } from "@/lib/constants";

const navItems = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "gallery", href: "#gallery" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass py-3 shadow-lg shadow-black/20" : "bg-transparent py-5"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASING }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="group relative text-lg font-semibold tracking-tight">
          <span className="text-gradient">
            {locale === "ar" ? "زاوية الذوق" : "Angolo della"}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <motion.div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
        </motion.div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass mx-4 mt-2 rounded-2xl p-6 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ease: EASING }}
          >
            <ul className="flex flex-col gap-4">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
            <motion.div className="mt-6">
              <LanguageSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
