import CustomCursor from "@/components/ui/Cursor";
import "../globals.css";
import NextThemesProvider from "./provider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// export const metadata = {
//   title: "Martine's Portfolio",
//   description: "A showcase of my work and projects.",
// };

export default function RootLayout({ children }) {
  return (
    <NextThemesProvider>
      {/* <CustomCursor /> */}

      <div className="relative min-h-screen bg-background">
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </NextThemesProvider>
  );
}
