"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/constants";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-6",
        hover && "transition-shadow duration-500 hover:shadow-lg hover:shadow-accent-purple/10",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ ease: EASING, duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent-purple/10 blur-3xl"
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
