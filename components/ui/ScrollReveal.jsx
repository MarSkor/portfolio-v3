"use client";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  const { ref, inView } = useInView({
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
    triggerOnce: true,
  });

  const Component = motion[Tag] || motion.div;

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
