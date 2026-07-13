import Link from "next/link";
import Image from "next/image";
import { getProjectsByType } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { AppStoreLogo, GoogleStoreLogo } from "@/components/icons/BrandIcons";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LINK_ICONS = {
  appstore: AppStoreLogo,
  playstore: GoogleStoreLogo,
};

const SideProjects = async () => {
  const apps = await getProjectsByType("mobile");

  if (apps.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-x">
        <ScrollReveal transition={{ duration: 0.8, ease: "easeOut" }}>
          <section>
            <p className="label-meta mb-4">Side Projects</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground ">
              Mobile Apps
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Solving my own problems, one pixel at a time. This is where I
              test-drive new ideas, break things on purpose, and try to build
              the kind of calm apps I actually want to use every day.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <section className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
            {apps.map((app) => {
              const icon = app.appIcon || app.thumbnail;
              return (
                <article
                  key={app._id}
                  className="group relative flex flex-col items-center text-center"
                >
                  <Link
                    href={`/work/${app.slug.current}`}
                    className="absolute inset-0 z-10"
                    aria-label={app.title}
                  />

                  <div className="grain-exempt aspect-square w-full max-w-37.5 overflow-hidden rounded-[22%] border border-border bg-secondary transition-all duration-300 group-hover:scale-105 group-hover:border-foreground/40">
                    {icon ? (
                      <Image
                        src={urlFor(icon).width(200).height(200).url()}
                        alt={icon.alt || app.title}
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

                  <h3 className="mt-4 text-base font-medium text-foreground transition-colors group-hover:text-accent">
                    {app.title}
                  </h3>

                  {app.description && (
                    <p className="mt-1 line-clamp-2 max-w-40 text-xs text-muted-foreground">
                      {app.description}
                    </p>
                  )}

                  {app.links?.length > 0 && (
                    <div className="relative z-20 mt-3 flex gap-2">
                      {app.links.map((link) => {
                        const Logo = LINK_ICONS[link.type];
                        if (!Logo) return null;
                        return (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-secondary p-1.5 transition-colors hover:bg-accent/20"
                            title={link.label}
                          >
                            <Logo className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SideProjects;
