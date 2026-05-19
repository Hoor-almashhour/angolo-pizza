"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EASING } from "@/lib/constants";
import type { GalleryItem } from "@/lib/data-store";

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const t = useTranslations("gallery");
  const locale = useLocale() as "ar" | "de";

  return (
    <SectionWrapper
      id="gallery"
      label={t("label")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <motion.figure
            key={item.id}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: EASING }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title[locale]}
                width={600}
                height={400 + (i % 3) * 100}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <figcaption className="text-sm font-medium">
                  {item.title[locale]}
                </figcaption>
              </motion.div>
            </div>
          </motion.figure>
        ))}
      </div>
    </SectionWrapper>
  );
}
