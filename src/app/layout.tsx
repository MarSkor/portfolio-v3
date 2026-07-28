import type { ReactNode } from "react";
import CustomCursor from "@/components/ui/Cursor";
import "./globals.css";
import { ThemeProvider } from "@teispace/next-themes";
import { getTheme } from "@teispace/next-themes/server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  metadataBase: new URL("https://martineskorbakk.com"),
  title: {
    template: `%s | Martine's Portfolio`,
    default: `Martine's Portfolio`,
  },
  description: "Designer & Developer. Crafting thoughtful digital experiences.",
  openGraph: {
    title: "Martine | Frontend Developer & UI Designer",
    description:
      "Designer & Developer. Crafting thoughtful digital experiences.",
    url: "https://martineskorbakk.com",
    siteName: "Martine Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Martine",
    creator: "@martinedev_",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = await getTheme();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
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
              className="grain-texture pointer-events-none fixed inset-0 z-10 opacity-[0.10] mix-blend-multiply dark:opacity-[0.10] dark:mix-blend-screen"
              aria-hidden="true"
            />
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
