"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EASING } from "@/lib/constants";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="relative py-24 md:py-32">
      <motion.div
        className="relative mx-6 overflow-hidden rounded-3xl md:mx-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASING }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent-purple/40 via-accent-blue/30 to-accent-gold/10"
          aria-hidden
        />
        <motion.div className="glass relative px-8 py-20 text-center md:px-16 md:py-28">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>
          <motion.div className="mt-10">
            <Button href="mailto:hello@angolodella.com" variant="primary">
              {t("button")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
