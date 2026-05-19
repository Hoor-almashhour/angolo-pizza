"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/constants";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
  label,
  title,
  subtitle,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} ref={ref} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {(label || title) && (
          <motion.header
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 40, filter: "blur(8px)" }
            }
            transition={{ duration: 0.8, ease: EASING }}
          >
            {label && (
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-accent-gold">
                {label}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted leading-relaxed">{subtitle}</p>
            )}
          </motion.header>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
