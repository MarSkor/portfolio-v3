import Link from "next/link";
import ProjectCard from "@/features/work/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getFeaturedProjects } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";

const SelectedWork = async () => {
  const projects = await getFeaturedProjects(3);

  return (
    <section id="work" className="border-border py-24 md:py-32">
      <div className="container-x">
        <ScrollReveal>
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-meta mb-4">Selected Work</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground ">
                Things I've built
              </h2>
            </div>

            <Link
              href="/work"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No featured projects yet.</p>
          ) : (
            <section className="space-y-6">
              {projects.map((project, i) => (
                <div key={project._id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </section>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SelectedWork;
