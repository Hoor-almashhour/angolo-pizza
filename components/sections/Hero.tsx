"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import { EASING } from "@/lib/constants";
import { HiArrowDown } from "react-icons/hi";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 gradient-mesh"
        style={{ y }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden />
      <div className="noise-overlay absolute inset-0" aria-hidden />

      <motion.div
        className="glass absolute inset-x-6 top-1/4 mx-auto max-w-4xl rounded-3xl p-1 md:inset-x-auto"
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASING }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center md:px-10">
        <motion.span
          className="mb-6 inline-block rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASING }}
        >
          {t("badge")}
        </motion.span>

        <AnimatedText
          text={t("title")}
          as="h1"
          className="text-4xl font-semibold leading-[1.15] tracking-tight text-gradient md:text-6xl lg:text-7xl"
          delay={0.3}
        />

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg text-muted md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASING }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: EASING }}
        >
          <Button href="#services" variant="primary">
            {t("ctaServices")}
          </Button>
          <Button href="#projects" variant="outline">
            {t("ctaProjects")}
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, ease: EASING }}
        aria-label={t("scroll")}
      >
        <span className="text-xs uppercase tracking-widest">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <HiArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
