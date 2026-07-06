const ProjectStats = ({ project }) => {
  const stats = [];
  if (project.year) stats.push({ label: "Year", value: project.year });
  if (project.duration)
    stats.push({ label: "Duration", value: project.duration });
  if (project.role) stats.push({ label: "Role", value: project.role });
  if (project.client) stats.push({ label: "Client", value: project.client });

  if (!stats.length) return null;

  return (
    // <section className="border-y border-border">
    //   <div className="flex flex-wrap">
    //     {stats.map((s, i) => (
    //       <div
    //         key={s.label}
    //         className={`min-w-37.5 flex-1 py-8 ${i > 0 ? "border-border md:border-l md:pl-8" : ""}`}
    //       >
    //         <p className="label-meta mb-2">{s.label}</p>
    //         <p className="font-heading text-lg text-foreground">{s.value}</p>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="border-y border-border">
      <div className="mx-auto flex max-w-monograph flex-wrap px-6 lg:px-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`min-w-37.5 flex-1 py-8 ${i > 0 ? "border-border md:border-l md:pl-8" : ""}`}
          >
            <p className="label-meta mb-2">{s.label}</p>
            <p className="font-heading text-lg text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectStats;
