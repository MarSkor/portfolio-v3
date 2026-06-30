import Link from "next/link";
import Image from "next/image";
import { getProjectsByType } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

const SideProjects = async () => {
  const apps = await getProjectsByType("mobile");

  // Return null if no apps - prevents empty section
  if (apps.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-x">
        <div>
          <p className="label-meta mb-4">Side Projects</p>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Mobile Apps
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Small apps I build on the side — experiments in calm interfaces and
            constrained screens.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
          {apps.map((app) => (
            // to fix - cant have link within a link
            <Link
              key={app._id}
              href={`/work/${app.slug.current}`}
              className="group flex w-full max-w-37.5 flex-col items-center text-center"
            >
              {/* Icon/Thumbnail */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[22%] border border-border bg-secondary transition-all duration-300 group-hover:scale-105 group-hover:border-foreground/40">
                {app.thumbnail ? (
                  <Image
                    src={urlFor(app.thumbnail).width(200).height(200).url()}
                    alt={app.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="label-meta">No icon</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-base font-medium text-foreground transition-colors group-hover:text-accent">
                {app.title}
              </h3>

              {/* Description */}
              {app.description && (
                <p className="mt-1 line-clamp-2 max-w-40 text-xs text-muted-foreground">
                  {app.description}
                </p>
              )}

              {/* Links */}
              {app.links && app.links.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {app.links.map((link) => (
                    <span
                      key={link.url}
                      // href={link.url}
                      // target="_blank"
                      // rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded bg-secondary hover:bg-accent/20 transition-colors"
                      title={link.label}
                    >
                      {link.type === "appstore" && "🍎"}
                      {link.type === "playstore" && "🤖"}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideProjects;
