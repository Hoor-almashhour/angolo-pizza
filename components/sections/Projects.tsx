"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EASING } from "@/lib/constants";
import type { Project } from "@/lib/data-store";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations("projects");
  const cat = useTranslations("categories");
  const locale = useLocale() as "ar" | "de";
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper
      id="projects"
      label={t("label")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-all",
              filter === c
                ? "bg-accent-purple/30 text-foreground"
                : "glass text-muted hover:text-foreground"
            )}
          >
            {c === "all"
              ? t("filterAll")
              : (["branding", "web", "campaign", "studio", "events"] as const).includes(
                    c as "branding"
                  )
                ? cat(c as "branding")
                : c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="group relative overflow-hidden rounded-2xl glass"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-widest text-accent-gold">
                  {cat(project.category as "branding")}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{project.title[locale]}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {project.description[locale]}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
