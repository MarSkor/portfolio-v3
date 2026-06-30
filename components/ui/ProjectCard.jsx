"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative grid grid-cols-1 overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.18)] md:grid-cols-2"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-secondary md:aspect-auto md:h-full">
        {project.thumbnail ? (
          <img
            src={urlFor(project.thumbnail)}
            // src={project.thumbnail}
            alt={project.thumbnail.alt || project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="label-meta">No preview</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between">
            <span className="label-meta">
              {String(index + 1).padStart(2, "0")} / {project.year || "—"}
            </span>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground" />
          </div>
          <h3 className="mt-6 font-heading text-2xl font-medium leading-tight text-foreground lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.shortDescription || project.description}
          </p>
        </div>

        {project.stack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
