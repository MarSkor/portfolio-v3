"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@teispace/next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="cursor-pointer relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun
        className={`h-4 w-4 transition-all duration-500 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"} absolute`}
      />
      <Moon
        className={`h-4 w-4 transition-all duration-500 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"} absolute`}
      />
    </button>
  );
}
