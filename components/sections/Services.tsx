"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { EASING } from "@/lib/constants";
import type { Service } from "@/lib/data-store";
import * as FiIcons from "react-icons/fi";

interface ServicesProps {
  services: Service[];
}

function getIcon(name: string) {
  const icons = FiIcons as Record<string, React.ComponentType<{ size?: number }>>;
  return icons[name] || FiIcons.FiStar;
}

export function Services({ services }: ServicesProps) {
  const t = useTranslations("services");
  const locale = useLocale() as "ar" | "de";

  return (
    <SectionWrapper
      id="services"
      label={t("label")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = getIcon(service.icon);
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASING }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-purple/20 text-accent-purple">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold">{service.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description[locale]}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
