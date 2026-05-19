"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/constants";

type Variant = "primary" | "glass" | "outline";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40",
  glass: "glass text-foreground hover:bg-white/10",
  outline:
    "border border-glass-border text-foreground hover:border-accent-purple/50 hover:bg-accent-purple/10",
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
    variants[variant],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { ease: EASING, duration: 0.4 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
