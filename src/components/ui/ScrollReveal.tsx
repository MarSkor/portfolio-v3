"use client";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import type { ElementType, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {

  const { ref, inView } = useInView({
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
    triggerOnce: true,
  });

  const Component = (motion as Record<string, any>)[Tag as string] || motion.div;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.9,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
