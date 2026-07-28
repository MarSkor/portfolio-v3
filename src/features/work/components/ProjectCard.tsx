"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import TechStack from "./ProjectTag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps ) => {
  return (
    <article className="group relative z-20 grid grid-cols-1 overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.18)] md:grid-cols-2">
      <Link
        href={`/work/${project.slug?.current}`}
        className="absolute inset-0 z-100"
        aria-label={`View ${project.title} project`}
      />

      <section className="relative aspect-4/3 overflow-hidden bg-secondary md:aspect-auto md:h-full pointer-events-none">
        {project.thumbnail ? (
          <img
            src={urlFor(project.thumbnail).url()}
            alt={project.thumbnail.alt || project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="label-meta">No preview</span>
          </div>
        )}
      </section>

      <section className="relative flex flex-col justify-between gap-8 p-8 lg:p-10 pointer-events-none">
        <div
          className="grain-texture pointer-events-none absolute inset-0 z-0 opacity-[0.10] mix-blend-multiply dark:mix-blend-screen"
          aria-hidden="true"
        />
        <div className="relative z-10 pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="label-meta">
              {String(index + 1).padStart(2, "0")} / {project.year || "—"}
            </span>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground" />
          </div>

          <h3 className="mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight text-foreground">
            {project.title}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.shortDescription || project.description}
          </p>
        </div>

        {project.techStack && project.techStack.length > 0 && (
          <TechStack tags={project?.techStack} className="mt-10" />
        )}
      </section>
    </article>
  );
};

export default ProjectCard;
