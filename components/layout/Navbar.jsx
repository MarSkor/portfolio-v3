"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/#about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const headerRef = useRef(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const handleAnchor = (to) => {
    const hash = to.split("#")[1];
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileOpen(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md will-change-[backdrop-filter]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-monograph items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent cursor-pointer"
        >
          Martine
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.to === "/") {
              return (
                <Link
                  key={link.label}
                  href="/"
                  onClick={handleHomeClick}
                  className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              );
            }

            const isHomeAnchor = link.to.includes("#") && pathname === "/";

            return isHomeAnchor ? (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.to)}
                className="cursor-pointer link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.to}
                className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center text-foreground"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link, i) => {
                const isHomeAnchor = link.to.includes("#") && pathname === "/";

                const content = (
                  <span className="block border-b border-border/60 py-3 text-base font-medium text-foreground">
                    {link.label}
                  </span>
                );

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.to === "/" ? (
                      <Link
                        href="/"
                        onClick={handleHomeClick}
                        className="block"
                      >
                        {content}
                      </Link>
                    ) : isHomeAnchor ? (
                      <button
                        onClick={() => handleAnchor(link.to)}
                        className="w-full text-left"
                      >
                        {content}
                      </button>
                    ) : (
                      <Link href={link.to}>{content}</Link>
                    )}
                  </motion.div>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
