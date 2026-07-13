"use client";
import { useMemo, useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ViewSwitcher from "@/components/ui/ViewSwitcher";
import ProjectCard from "@/features/work/ProjectCard";
import ProjectGridView from "@/features/work/ProjectGridView";
import ProjectIndexView from "@/features/work/ProjectIndexView";
import Dropdown from "@/components/ui/DropDown";

const WorkFilters = ({ projects }) => {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("list");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile && view === "list") {
        setView("grid");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [view]);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.category || []))).sort(),
    ],
    [projects],
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category?.includes(filter)),
    [projects, filter],
  );

  const dropdownOptions = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat,
        label: cat === "All" ? "All Projects" : cat.replace(/-/g, " "),
      })),
    [categories],
  );

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground">
        No projects yet - check back soon.
      </p>
    );
  }

  return (
    <>
      <section className="mb-12 flex items-center justify-between gap-4 md:hidden">
        <Dropdown
          value={filter}
          onChange={setFilter}
          options={dropdownOptions}
          label="All Projects"
        />

        <ViewSwitcher view={view} onChange={setView} />
      </section>

      <section className="mb-12 hidden flex-wrap items-center justify-between gap-4 md:flex">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`cursor-pointer border-b pb-1 text-sm font-medium capitalize transition-colors ${
                filter === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "All" ? "All" : cat.replace(/-/g, " ")}
            </button>
          ))}
        </div>
        <ViewSwitcher view={view} onChange={setView} />
      </section>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : view === "grid" ? (
        <ProjectGridView projects={filtered} />
      ) : view === "index" ? (
        <ProjectIndexView projects={filtered} />
      ) : (
        <div className="space-y-6">
          {filtered.map((project, i) => (
            <ScrollReveal key={project._id} delay={i * 60}>
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
};

export default WorkFilters;
