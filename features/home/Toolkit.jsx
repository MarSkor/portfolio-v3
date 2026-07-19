import { Terminal, Component, Wrench, PenTool, Code2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getToolkitContent } from "@/lib/sanity";

const CATEGORY_META = {
  "Languages & Frameworks": {
    icon: Terminal,
    gradient: "from-accent to-accent",
    bar: "bg-accent",
  },
  Development: {
    icon: Component,
    gradient: "from-accent to-accent",
    bar: "bg-accent",
  },
  // Frameworks: {
  //   icon: Component,
  //   gradient: "from-accent-teal to-accent-teal",
  //   bar: "bg-accent-teal",
  // },
  Tools: {
    icon: Wrench,
    gradient: "from-accent to-accent-teal",
    bar: "bg-gradient-to-r from-accent to-accent-teal",
  },
  Design: {
    icon: PenTool,
    gradient: "from-accent-teal to-accent",
    bar: "bg-gradient-to-r from-accent-teal to-accent",
  },
};

const Toolkit = async () => {
  const toolkit = await getToolkitContent();
  const categories =
    toolkit?.categories?.filter((c) => c.skills?.length > 0) || [];

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <ScrollReveal>
          <p className="label-meta mb-4">Toolkit</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-tight text-foreground ">
            Skills &amp; stack
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mt-16">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((group, gi) => {
              const meta = CATEGORY_META[group.name];
              const Icon = meta?.icon || Code2;
              return (
                <ScrollReveal key={group.name} delay={gi * 80}>
                  <div className="group relative flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-foreground/30 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.2)]">
                    <div
                      className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 ${meta?.bar || "bg-accent"} transition-transform duration-500 group-hover:scale-x-100`}
                    />

                    <section className="flex flex-1 flex-col p-7">
                      <div className="mb-6 flex items-start justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center bg-linear-to-br ${meta?.gradient || "from-accent to-accent-teal"} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="label-meta mt-1">
                          {String(group.skills.length).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="label-meta text-sm mb-5">{group.name}</p>

                      <ul className="space-y-2.5">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="group/item flex items-center gap-3 text-base text-muted-foreground transition-colors duration-300 hover:text-foreground"
                          >
                            <span
                              className={`h-px w-3 shrink-0 ${meta?.bar || "bg-accent"} transition-all duration-300 group-hover/item:w-5`}
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </ScrollReveal>
              );
            })}
          </section>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Toolkit;
