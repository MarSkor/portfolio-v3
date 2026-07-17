"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * TextTicker
 * Cycles through an array of text items with fade/slide animation
 *
 * @param {Array} items - Array of strings or objects with text property
 * @param {string} textKey - If items are objects, which property contains the text
 * @param {number} duration - How long each item displays (ms)
 * @param {string} className - Additional Tailwind classes
 */
const TextTicker = ({
  items = [],
  textKey = "note",
  duration = 4000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, duration);

    return () => clearInterval(timer);
  }, [items.length, duration]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];
  const text =
    typeof currentItem === "string" ? currentItem : currentItem[textKey];

  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-16"
        >
          <p className="text-sm leading-relaxed text-foreground">{text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-1.5">
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-colors duration-300 ${
              i === currentIndex ? "bg-foreground" : "bg-border/40"
            }`}
            animate={{ width: i === currentIndex ? 24 : 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TextTicker;
