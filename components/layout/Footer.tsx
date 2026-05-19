"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SOCIAL_LINKS } from "@/lib/constants";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { EASING } from "@/lib/constants";

const socials = [
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: "Facebook" },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
];

const links = ["about", "services", "projects", "gallery", "contact"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-glass-border py-16">
      <motion.div
        className="mx-auto max-w-7xl px-6 md:px-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASING }}
      >
        <motion.div className="grid gap-12 md:grid-cols-3">
          <motion.div>
            <p className="text-2xl font-semibold text-gradient">
              {locale === "ar" ? "زاوية الذوق" : "Angolo della"}
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted leading-relaxed">
              {locale === "ar"
                ? "تجارب بصرية سينمائية فاخرة"
                : "Premium cinematic visual experiences"}
            </p>
            <motion.div className="mt-6">
              <LanguageSwitcher />
            </motion.div>
          </motion.div>

          <motion.div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-accent-gold">
              {t("links")}
            </p>
            <ul className="flex flex-col gap-2">
              {links.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {nav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-accent-gold">
              {t("follow")}
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-muted transition-all hover:scale-105 hover:text-foreground hover:shadow-lg hover:shadow-accent-purple/20"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 text-sm text-muted md:flex-row">
          <p>
            © {year} {locale === "ar" ? "زاوية الذوق" : "Angolo della"}. {t("rights")}.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
