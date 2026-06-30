"use client";
import { ThemeProvider } from "next-themes";

const NextThemesProvider = ({ children, ...props }) => {
  const scriptProps =
    typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <ThemeProvider
      scriptProps={scriptProps}
      {...props}
      attribute={"data-theme"}
      defaultTheme="dark"
      storageKey="portfolio-theme"
      themes={["light", "dark"]}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
};

export default NextThemesProvider;
