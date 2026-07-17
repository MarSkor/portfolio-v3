import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, urlFor } from "@/lib/sanity";
import StoreLinks from "@/components/ui/StoreLinks";
import TechStack from "./ProjectTag";
import ProjectStats from "./ProjectStats";
import ProcessGallery from "./ProcessGallery";
import PortableText from "@/components/ui/PortableText";

const SPAN_CLASSES = {
  1: "col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
};

const ProjectContent = async ({ slug }) => {
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const sections = [
    { label: "The Brief", value: project.brief },
    { label: "The Approach", value: project.approach },
    { label: "The Result", value: project.result },
  ].filter((s) => s.value?.length > 0);

  const cover = project.coverImage || project.thumbnail;

  return (
    <article>
      {/* Hero: Full-width image with generous breathing room */}
      {cover && (
        <section className="grain-exempt border-b border-border">
          <div className="w-full overflow-hidden bg-secondary py-12 md:py-20">
            <Image
              src={urlFor(cover).width(2400).url()}
              alt={cover.alt || project.title}
              width={2400}
              height={1350}
              priority
              className="mx-auto h-auto w-full max-w-7xl object-cover px-6 lg:px-10"
            />
          </div>
        </section>
      )}

      {/* Main content with sidebar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Sidebar: Meta info (grid on mobile, sticky on desktop) */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 lg:h-fit">
          <div className="grid grid-cols-2 gap-6 lg:flex lg:flex-col lg:space-y-8 lg:border-l lg:border-border/30 lg:pl-6">
            {/* Year & Role */}
            <div className="col-span-2 lg:col-span-1">
              <p className="label-meta text-xs mb-2">Project</p>
              <p className="text-sm text-foreground">
                {project.year || "—"}
                {project.role ? ` · ${project.role}` : ""}
              </p>
            </div>

            {/* Client */}
            {project.client && (
              <div>
                <p className="label-meta text-xs mb-2">Client</p>
                <p className="text-sm text-foreground">{project.client}</p>
              </div>
            )}

            {/* Duration */}
            {project.duration && (
              <div>
                <p className="label-meta text-xs mb-2">Duration</p>
                <p className="text-sm text-foreground">{project.duration}</p>
              </div>
            )}

            {/* Tech Stack - Horizontal */}
            {project.techStack?.length > 0 && (
              <div className="col-span-2 lg:col-span-1">
                <p className="label-meta text-xs mb-3">Stack</p>
                <TechStack tags={project?.techStack} className="flex-wrap" />
              </div>
            )}

            {/* Links */}
            {project.links?.length > 0 && (
              <div className="col-span-2 lg:col-span-1 lg:pt-4 lg:border-t lg:border-border/30">
                <p className="label-meta text-xs mb-4">Links</p>
                <div className="flex flex-col gap-2">
                  <StoreLinks project={project} variant="buttons" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Center Content: Main narrative */}
        <div className="lg:col-span-2">
          {/* Header */}
          <header className="mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-medium leading-tight text-foreground mb-6">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}
          </header>

          {/* Stats Section */}
          {project.stats?.length > 0 && (
            <div className="mb-16 pb-16 border-b border-border">
              <ProjectStats project={project} />
            </div>
          )}

          {/* Overview & Sections */}
          {(project.overview || sections.length > 0) && (
            <div className="mb-16">
              {project.overview && (
                <div className="mb-12">
                  <p className="label-meta mb-6">Overview</p>
                  <PortableText value={project.overview} />
                </div>
              )}

              {sections.map((section, i) => (
                <div key={section.label} className="mb-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    {section.label}
                  </h2>
                  <PortableText value={section.value} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Process Gallery - Full Width */}
      {project.processImages?.length > 0 && (
        <div className="border-t border-border">
          <ProcessGallery images={project.processImages} />
        </div>
      )}

      {/* Project Gallery */}
      {project.gallery?.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="label-meta mb-12">Gallery</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.gallery.map((item, i) => (
                <figure
                  key={i}
                  className={`grain-exempt overflow-hidden border border-border bg-secondary ${
                    SPAN_CLASSES[item.span] || SPAN_CLASSES[1]
                  }`}
                >
                  <Image
                    src={urlFor(item.image).width(1400).url()}
                    alt={item.alt || item.caption || `Gallery image ${i + 1}`}
                    width={1400}
                    height={1000}
                    className="h-auto w-full object-cover"
                  />
                  {item.caption && (
                    <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {project.relatedProjects?.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="label-meta mb-12">More Work</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {project.relatedProjects.map((related) => (
                <Link
                  key={related._id}
                  href={`/work/${related.slug?.current}`}
                  className="group block overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                    {related.thumbnail && (
                      <Image
                        src={urlFor(related.thumbnail)
                          .width(600)
                          .height(450)
                          .url()}
                        alt={related.thumbnail.alt || related.title}
                        width={600}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="label-meta text-xs">
                      {related.year || "—"}
                    </span>
                    <h3 className="mt-3 font-heading text-lg font-medium text-foreground">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectContent;

// not entirely certain which layout i want to keep x_x
// ---------------------------------------------------------------------------------------------
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { getProject, urlFor } from "@/lib/sanity";
// import StoreLinks from "@/components/ui/StoreLinks";
// import TechStack from "./ProjectTag";
// import ProjectStats from "./ProjectStats";
// import ProcessGallery from "./ProcessGallery";
// import PortableText from "@/components/ui/PortableText";

// const SPAN_CLASSES = {
//   1: "col-span-1",
//   2: "sm:col-span-2",
//   3: "sm:col-span-3",
// };

// const ProjectContent = async ({ slug }) => {
//   const project = await getProject(slug);

//   if (!project) {
//     notFound();
//   }

//   const sections = [
//     { label: "The Brief", value: project.brief },
//     { label: "The Approach", value: project.approach },
//     { label: "The Result", value: project.result },
//   ].filter((s) => s.value?.length > 0);

//   const cover = project.coverImage || project.thumbnail;

//   return (
//     <article>
//       {cover && (
//         <section className="grain-exempt border-y border-border bg-secondary py-12 md:py-16">
//           <div className="mx-auto max-w-5xl px-6 lg:px-10">
//             <Image
//               src={urlFor(cover).width(1920).url()}
//               alt={cover.alt || project.title}
//               width={1920}
//               height={1080}
//               priority
//               className="h-auto w-full border border-border object-cover"
//             />
//           </div>
//         </section>
//       )}

//       <section className="mx-auto max-w-monograph px-6 lg:px-10">
//         <header className="py-16 md:py-20">
//           <p className="label-meta mb-6 text-sm">
//             {project.year || "—"}
//             {project.role ? ` · ${project.role}` : ""}
//           </p>
//           <h1 className="max-w-4xl font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground">
//             {project.title}
//           </h1>
//           {project.description && (
//             <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
//               {project.description}
//             </p>
//           )}

//           {project.links?.length > 0 && (
//             <div className="mt-10 flex flex-wrap items-center gap-4">
//               <StoreLinks project={project} variant="buttons" />
//             </div>
//           )}

//           {project.techStack?.length > 0 && (
//             <TechStack tags={project?.techStack} className="mt-10" />
//           )}
//         </header>
//       </section>

//       <ProjectStats project={project} />

//       {(project.overview || sections.length > 0) && (
//         <section className="py-16 md:py-20">
//           <div className="mx-auto max-w-prose-col px-6 lg:px-10">
//             <p className="label-meta mb-8">Overview</p>

//             {project.overview && <PortableText value={project.overview} />}

//             {sections.map((section, i) => (
//               <div
//                 key={section.label}
//                 className={project.overview || i > 0 ? "mt-14" : ""}
//               >
//                 <h2 className="mb-6 font-heading text-3xl font-semibold text-foreground">
//                   {section.label}
//                 </h2>
//                 <PortableText value={section.value} />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {project.processImages?.length > 0 && (
//         <ProcessGallery images={project.processImages} />
//       )}

//       {project.gallery?.length > 0 && (
//         <section className="border-t border-border py-16 md:py-20">
//           <div className="mx-auto max-w-monograph px-6 lg:px-10">
//             <p className="label-meta mb-8">Gallery</p>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               {project.gallery.map((item, i) => (
//                 <figure
//                   key={i}
//                   className={`grain-exempt overflow-hidden border border-border bg-secondary ${
//                     SPAN_CLASSES[item.span] || SPAN_CLASSES[1]
//                   }`}
//                 >
//                   <Image
//                     src={urlFor(item.image).width(1400).url()}
//                     alt={item.alt || item.caption || `Gallery image ${i + 1}`}
//                     width={1400}
//                     height={1000}
//                     className="h-auto w-full object-cover"
//                   />
//                   {item.caption && (
//                     <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
//                       {item.caption}
//                     </figcaption>
//                   )}
//                 </figure>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {project.relatedProjects?.length > 0 && (
//         <section className="border-t border-border py-16 md:py-20 ">
//           <div className="mx-auto max-w-monograph px-6 lg:px-10">
//             <p className="label-meta mb-8">More Work</p>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//               {project.relatedProjects.map((related) => (
//                 <Link
//                   key={related._id}
//                   href={`/work/${related.slug?.current}`}
//                   className="group block overflow-hidden border border-border bg-card shadow-[0_2px_12px_-4px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40"
//                 >
//                   <div className="relative aspect-4/3 overflow-hidden bg-secondary">
//                     {related.thumbnail && (
//                       <Image
//                         src={urlFor(related.thumbnail)
//                           .width(600)
//                           .height(450)
//                           .url()}
//                         alt={related.thumbnail.alt || related.title}
//                         width={600}
//                         height={450}
//                         className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                       />
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <span className="label-meta">{related.year || "—"}</span>
//                     <h3 className="mt-2 font-heading text-lg font-medium text-foreground">
//                       {related.title}
//                     </h3>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </article>
//   );
// };

// export default ProjectContent;
