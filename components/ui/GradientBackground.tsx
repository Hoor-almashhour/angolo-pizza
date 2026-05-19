"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GradientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 gradient-mesh"
      style={{ y, opacity }}
      aria-hidden
    />
  );
}
