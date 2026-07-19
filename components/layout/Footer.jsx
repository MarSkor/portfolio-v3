import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Blog", to: "/blog" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <section className="flex flex-col items-center justify-between gap-4 border-b border-border py-8 sm:flex-row">
          <p className="label-meta">Portfolio Archive</p>
          <div className="flex items-center gap-6">
            {[
              {
                label: "Vol. 00",
                year: "2021",
                href: "https://fed-portfolio-v1.netlify.app",
              },
              {
                label: "Vol. 01",
                year: "2022",
                href: "https://marskor-portfolio-v1.netlify.app",
              },
              {
                label: "Vol. 02",
                year: "2025",
                href: "https://portfolio-v2-iota-sand.vercel.app",
              },
              { label: "Vol. 03", year: "2026", href: null },
            ].map((vol) =>
              vol.href ? (
                <Link
                  key={vol.label}
                  href={vol.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {vol.label}
                </Link>
              ) : (
                <span
                  key={vol.label}
                  className="text-sm font-medium text-foreground"
                >
                  {vol.label}
                </span>
              ),
            )}
          </div>
        </section>

        <section className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            © {year} Martine Skorbakk
          </p>
          <div className="flex items-center gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Built with a mug (or two) of cocoa
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
