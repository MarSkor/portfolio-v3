"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const PHRASES = [
  "interfaces that flirt back",
  "software with a pulse",
  "the digital equivalent of a cozy sweater",
  "buttons you'll want to click twice",
  "pixels with feelings",
  "layouts that breathe",
  "the internet’s front porch",
  "things that look good and work better",
  "CSS that (mostly) behaves",
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const bgRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const mouseXPct = useMotionValue(0.5);
  const mouseYPct = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseXPct, springConfig);
  const smoothY = useSpring(mouseYPct, springConfig);

  const handleMouseMove = (e) => {
    const rect = bgRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseXPct.set((e.clientX - rect.left) / rect.width);
    mouseYPct.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseXPct.set(0.5);
    mouseYPct.set(0.5);
  };

  const gridX = useTransform(smoothX, [0, 1], [8, -8]);
  const gridY = useTransform(smoothY, [0, 1], [8, -8]);

  const spotlightX = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(smoothY, (v) => `${v * 100}%`);
  const spotlightBackground = useMotionTemplate`radial-gradient(480px circle at ${spotlightX} ${spotlightY}, hsl(var(--accent) / var(--spotlight-opacity)), transparent 70%)`;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border py-24 md:py-40">
      <div
        ref={bgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.svg
          className="absolute inset-0 h-full w-full"
          style={{ opacity: 0.05, x: gridX, y: gridY }}
        >
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlightBackground }}
        />

        <div className="absolute inset-0 bg-linear-to-br from-background via-transparent to-background opacity-40" />
      </div>

      <section className="relative z-10 mx-auto max-w-monograph px-6 lg:px-10">
        <ScrollReveal>
          <div className="mb-12 flex items-center justify-between">
            <p
              className="label-meta animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              Portfolio — Vol. 03
            </p>
            <p
              className="label-meta flex items-center gap-1.5 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-teal" />
              Available for work
            </p>
          </div>
        </ScrollReveal>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold leading-[1.15] text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem]"
        >
          <span className="block">Hi. I'm Martine. A frontend developer.</span>
          <span className="block text-accent">
            I like interfaces that respect people's time and attention. Fast,
            clear, and built for the person using it.
          </span>
        </motion.h1>

        <section className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            Merging design and code to build digital spaces that feel right.
            Currently wrestling with CSS, tinkering with React Native, and
            looking for my next favorite TV show.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex shrink-0 items-center gap-4"
          >
            <Link
              href="/work"
              className="group inline-flex h-11 items-center justify-center gap-2 border border-foreground bg-foreground px-6 text-sm font-medium tracking-wide text-background transition-all duration-300 hover:-translate-y-0.5"
            >
              View work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <a
              href="#contact"
              className="link-underline inline-flex h-11 items-center text-sm font-medium text-foreground"
            >
              Contact
            </a>
          </motion.div>
        </section>
      </section>
    </section>
  );
};

export default Hero;
