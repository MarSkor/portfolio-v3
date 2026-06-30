"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 60 : 16;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooths the cursor movement with spring physics
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorSize, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-blue-500 rounded-full pointer-events-none z-150 mix-blend-difference"
      style={{
        width: cursorSize,
        height: cursorSize,
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
    />
  );
}
