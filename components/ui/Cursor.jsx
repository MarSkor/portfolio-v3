"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const HOVER_SELECTOR =
  "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Position lags the real cursor slightly (the "trailing ring" feel).
  const springConfig = { stiffness: 500, damping: 32, mass: 0.3 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e) => {
      setIsHovered(Boolean(e.target.closest(HOVER_SELECTOR)));
    };

    const handleLeaveWindow = () => setIsVisible(false);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleLeaveWindow,
      );
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY]);

  const shouldHide = scrolled && mouseY.get() < 64;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-150 hidden rounded-full border border-accent/70 shadow-[0_0_16px_hsl(var(--accent)/0.35)] md:block"
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{
        width: isHovered ? 56 : 28,
        height: isHovered ? 56 : 28,
        borderWidth: isHovered ? 1 : 1.5,
        backgroundColor: isHovered
          ? "hsl(var(--accent) / 0.12)"
          : "hsl(var(--accent) / 0)",
        opacity: isVisible && !shouldHide ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
