import { PortableText as PortableTextReact } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const components = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-foreground/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-heading text-4xl font-semibold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-heading text-2xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 font-heading text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 text-lg italic leading-relaxed text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-lg text-foreground/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-lg text-foreground/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-foreground/80">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-foreground/80">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="link-underline text-accent"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <div className="grain-exempt overflow-hidden border border-border bg-secondary">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }) => {
      const toneStyles = {
        info: "border-accent-teal/40 bg-accent-teal/5",
        warning: "border-destructive/40 bg-destructive/5",
        success: "border-accent-teal/40 bg-accent-teal/5",
        neutral: "border-border bg-secondary",
      };
      return (
        <div
          className={`my-8 border-l-2 px-6 py-4 text-base leading-relaxed text-foreground/80 ${
            toneStyles[value.tone] || toneStyles.neutral
          }`}
        >
          {value.text}
        </div>
      );
    },
  },
};

export default function PortableText({ value }) {
  if (!value) return null;
  return (
    <div className="space-y-6">
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
