import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden w-full h-[60vh] md:h-screen bg-(--background) text-(--text)">
      <div className="absolute inset-0 bg-cover bg-center">
        <Image
          src="/assets/images/bg_transparent_v2.svg"
          alt="hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-background/20 dark:bg-background/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-xxl max-w-monograph px-6 lg:px-10">
        <div className="max-w-5xl">
          <p
            className="label-meta mb-8 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            Portfolio — Vol. 03
          </p>
          <h1
            className="font-display text-[2.5rem] font-black leading-[1.2] tracking-[-0.01em] text-foreground sm:text-3xl md:text-4xl lg:text-[5rem] animate-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            Hi, I'm Martine — Front-End Developer & UI Designer. I craft
            interfaces that feel as good as they look.
          </h1>
          <div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center border border-foreground px-8 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]"
            >
              View my work
            </Link>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center border border-foreground px-8 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="label-meta">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
