"use client";
import Link from "next/link";
import { useState } from "react";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "Blog", to: "/blog" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [currently, setCurrently] = useState(null);

  // useEffect(() => {
  //   base44.entities.CurrentlyItem.list('-created_date', 1)
  //     .then((items) => setCurrently(items[0] || null))
  //     .catch(() => {});
  // }, []);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        {/* Creative strip */}
        {/* <div className="flex flex-col items-center justify-between gap-4 border-b border-border py-6 sm:flex-row">
          {currently ? (
            <Link
              href="/#about"
              className="link-underline group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Sparkles className="h-4 w-4 text-accent transition-transform group-hover:rotate-12" />
              <span className="label-meta">Currently</span>
              <span className="font-medium text-foreground">
                {currently.value}
              </span>
            </Link>
          ) : (
            <span className="label-meta">Currently —</span>
          )}
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Made by hand, not by template
          </p>
        </div> */}

        {/* Main footer row */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            © {year} Martine Skorbakk
          </p>
          <div className="flex items-center gap-6">
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
            Built with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
