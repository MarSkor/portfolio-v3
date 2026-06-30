import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getFeaturedProjects } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";

const SelectedWork = async () => {
  const projects = await getFeaturedProjects(3);

  return (
    <section id="work" className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-meta mb-4">Selected Work</p>
            <h2 className="text-4xl font-bold text-foreground md:text-5xl">
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

        {projects.length === 0 ? (
          <p className="text-muted-foreground">No featured projects yet.</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project, i) => (
              <div key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWork;
