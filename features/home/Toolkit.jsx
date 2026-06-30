import { Code2, Component, Wrench, Palette } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const CATEGORY_ORDER = ["Languages", "Frameworks", "Tools", "Design"];

const CATEGORY_META = {
  Languages: { icon: Code2, accent: "text-accent" },
  Frameworks: { icon: Component, accent: "text-accent-teal" },
  Tools: { icon: Wrench, accent: "text-accent" },
  Design: { icon: Palette, accent: "text-accent-teal" },
};

const Toolkit = () => {
  const skills = [
    {
      id: "1",
      name: "JavaScript",
      category: "Languages",
      order: 1,
    },
    {
      id: "2",
      name: "TypeScript",
      category: "Languages",
      order: 2,
    },
    {
      id: "3",
      name: "React",
      category: "Frameworks",
      order: 1,
    },
    {
      id: "4",
      name: "Next.js",
      category: "Frameworks",
      order: 2,
    },
    {
      id: "5",
      name: "Tailwind CSS",
      category: "Tools",
      order: 1,
    },
    {
      id: "6",
      name: "Figma",
      category: "Design",
      order: 1,
    },
    {
      id: "7",
      name: "Adobe XD",
      category: "Design",
      order: 2,
    },
  ];

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: skills
      .filter((s) => s.category === cat)
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <ScrollReveal>
          <p className="label-meta mb-4">Toolkit</p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Skills &amp; stack
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mt-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {grouped.map((group, gi) => {
              const meta = CATEGORY_META[group.category];
              const Icon = meta?.icon || Code2;
              return (
                <ScrollReveal key={group.category} delay={gi * 80}>
                  <div className="group flex h-full flex-col border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.15)]">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-border transition-colors duration-500 group-hover:border-foreground/30">
                        <Icon
                          className={`h-4 w-4 ${meta?.accent || "text-accent"}`}
                        />
                      </div>
                      <p className="label-meta">{group.category}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <li
                          key={skill.id}
                          className="border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Toolkit;
