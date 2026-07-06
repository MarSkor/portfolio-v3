import "./globals.css";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Page not found",
};

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
      <ScrollReveal>
        <p className="label-meta mb-6">404</p>
        <h1 className="font-heading text-6xl font-medium leading-tight text-foreground md:text-8xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, moved, or maybe
          never was. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 border border-foreground px-6 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex h-11 items-center gap-2 border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            View work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default NotFoundPage;
