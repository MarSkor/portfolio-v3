import CustomCursor from "@/components/ui/Cursor";
import "../globals.css";
import { ThemeProvider } from "@teispace/next-themes";
import { getTheme } from "@teispace/next-themes/server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default async function RootLayout({ children }) {
  const initialTheme = await getTheme();

  return (
    <ThemeProvider
      attribute="data-theme"
      initialTheme={initialTheme ?? undefined}
      enableSystem
      storageKey="portfolio-theme"
      themes={["light", "dark"]}
    >
      <CustomCursor />
      <div className="relative flex min-h-screen flex-col bg-background">
        <div
          className="grain-texture pointer-events-none fixed inset-0 z-100 opacity-[0.10] mix-blend-multiply dark:opacity-[0.10] dark:mix-blend-screen"
          aria-hidden="true"
        />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
