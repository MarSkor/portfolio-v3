import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { urlFor } from "@/lib/sanity";

const ProjectGridView = ({ projects }) => {
  return (
    <article className="relative z-0 grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <ScrollReveal key={project._id} delay={i * 50}>
          <section className="group relative z-0 flex h-full flex-col overflow-hidden border border-border bg-card shadow-[0_2px_12px_-4px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.18)]">
            <Link
              href={`/work/${project.slug?.current}`}
              className="absolute inset-0 z-10"
              aria-label={`View ${project.title} project`}
            />

            <section className="relative z-20 grain-exempt aspect-4/3 overflow-hidden bg-secondary pointer-events-none">
              {project.thumbnail ? (
                <Image
                  src={urlFor(project.thumbnail).width(800).height(600).url()}
                  alt={project.thumbnail.alt || project.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="label-meta">No preview</span>
                </div>
              )}
            </section>

            <section className="relative z-20 flex flex-1 flex-col gap-4 p-6 pointer-events-none">
              <div className="flex items-center justify-between">
                <span className="label-meta">
                  {String(i + 1).padStart(2, "0")} / {project.year || "—"}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground" />
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight text-foreground">
                {project.title}
              </h3>

              {project.description && (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              )}

              {project.category?.length > 0 && (
                <span className="mt-auto font-mono text-[11px] uppercase tracking-wider text-foreground/90">
                  {project.category.join(" · ")}
                </span>
              )}
            </section>
          </section>
        </ScrollReveal>
      ))}
    </article>
  );
};

export default ProjectGridView;
