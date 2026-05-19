"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { EASING } from "@/lib/constants";

const stats = [
  { key: "projects", value: 120 },
  { key: "clients", value: 85 },
  { key: "years", value: 12 },
  { key: "awards", value: 24 },
] as const;

function Counter({ value, active }: { value: number; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, value]);

  return <span>{count}+</span>;
}

export function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="about"
      label={t("label")}
      title={t("title")}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <p className="text-lg leading-relaxed text-muted">{t("description")}</p>
        <div ref={ref} className="grid grid-cols-2 gap-4">
          {stats.map(({ key, value }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASING }}
            >
              <GlassCard className="text-center">
                <p className="text-3xl font-semibold text-gradient md:text-4xl">
                  <Counter value={value} active={isInView} />
                </p>
                <p className="mt-2 text-sm text-muted">{t(`stats.${key}`)}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
