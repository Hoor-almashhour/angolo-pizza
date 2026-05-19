"use client";

import { motion } from "framer-motion";
import { EASING } from "@/lib/constants";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  split?: "words" | "chars";
}

export function AnimatedText({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  split = "words",
}: AnimatedTextProps) {
  const units = split === "words" ? text.split(" ") : text.split("");

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span className="inline-flex flex-wrap gap-x-[0.25em]" aria-hidden>
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            className="inline-block overflow-hidden"
            initial={{ opacity: 0, y: "100%", filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: EASING,
            }}
          >
            {unit}
            {split === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
