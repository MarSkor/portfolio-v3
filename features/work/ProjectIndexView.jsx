"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { urlFor } from "@/lib/sanity";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProjectIndexView({ projects }) {
  const [hovered, setHovered] = useState(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springConfig = { stiffness: 200, damping: 25 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMove = (e) => {
    mouseX.set(e.clientX - 112);
    mouseY.set(e.clientY - 80);
  };

  return (
    <ScrollReveal>
      <article onMouseMove={handleMove} className="relative">
        <section className="relative z-0 border-t border-border">
          {projects.map((project, i) => (
            <div
              key={project._id}
              onMouseEnter={() => setHovered(project)}
              onMouseLeave={() => setHovered(null)}
              className="relative z-0 group grid grid-cols-12 items-center gap-4 border-b border-border py-6 transition-colors duration-300 hover:bg-secondary/50"
            >
              <Link
                href={`/work/${project.slug?.current}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${project.title} project`}
              />

              <span className="relative z-20 col-span-2 font-mono text-xs text-muted-foreground sm:col-span-1 pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="relative z-20 col-span-7 text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:col-span-6 pointer-events-none">
                {project.title}
              </h3>

              <span className="relative z-20 hidden font-mono text-xs uppercase tracking-wider text-muted-foreground sm:col-span-2 sm:block pointer-events-none">
                {project.year || "—"}
              </span>

              <span className="relative z-20 col-span-3 text-right font-mono text-[11px] uppercase tracking-wider text-foreground sm:col-span-3 sm:text-left pointer-events-none">
                {project.category?.join(" · ") || ""}
              </span>
            </div>
          ))}
        </section>

        {hovered?.thumbnail && (
          <motion.div
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-40 w-56 overflow-hidden border border-border bg-card shadow-[0_16px_48px_-16px_rgba(0,0,0,0.25)] md:block"
          >
            <motion.div
              key={hovered._id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <Image
                src={urlFor(hovered.thumbnail).width(448).height(320).url()}
                alt={hovered.thumbnail.alt || hovered.title}
                width={448}
                height={320}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </article>
    </ScrollReveal>
  );
}
