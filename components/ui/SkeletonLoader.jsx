"use client";

import { motion } from "motion/react";

const SkeletonLoader = ({ variant = "card", count = 1, className = "" }) => {
  const pulse = {
    animate: { opacity: [0.6, 1, 0.6] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  if (variant === "card") {
    return (
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <div className={`grid gap-6 ${className}`}>
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-border bg-card overflow-hidden"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="aspect-4/3 bg-secondary" />

              <div className="p-6 space-y-4">
                <div className="h-4 bg-secondary rounded w-1/4" />
                <div className="h-6 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-full" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <motion.div
          className={`space-y-2 ${className}`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-5/6" />
          <div className="h-4 bg-secondary rounded w-4/5" />
        </motion.div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-border bg-card overflow-hidden"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="aspect-4/3 bg-secondary" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-secondary rounded w-1/3" />
                <div className="h-5 bg-secondary rounded w-2/3" />
                <div className="h-4 bg-secondary rounded w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "project") {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <article
            key={i}
            className="grid grid-cols-1 overflow-hidden border border-border bg-card md:grid-cols-2"
          >
            <div className="aspect-4/3 overflow-hidden bg-secondary md:aspect-auto md:h-full">
              <motion.div {...pulse} className="h-full w-full bg-muted/20" />
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
              <div>
                {/* Meta Row (Index / Year) */}
                <div className="flex items-center justify-between">
                  <motion.div
                    {...pulse}
                    className="h-4 w-16 rounded bg-secondary"
                  />
                  <motion.div
                    {...pulse}
                    className="h-5 w-5 rounded bg-secondary"
                  />
                </div>

                <motion.div
                  {...pulse}
                  className="mt-6 h-8 w-3/4 rounded bg-secondary sm:h-9"
                />

                <div className="mt-4 space-y-2">
                  <motion.div
                    {...pulse}
                    className="h-4 w-full rounded bg-secondary"
                  />
                  <motion.div
                    {...pulse}
                    className="h-4 w-5/6 rounded bg-secondary"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-2">
                {[1, 2, 3].map((tag) => (
                  <motion.div
                    key={tag}
                    {...pulse}
                    className="h-6 w-16 rounded-full bg-secondary"
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (variant === "blog") {
    return (
      <div className={`divide-y divide-border ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-12 sm:gap-6"
          >
            <div className="sm:col-span-3 space-y-2">
              <motion.div
                {...pulse}
                className="h-3 w-20 bg-secondary rounded"
              />
              <motion.div
                {...pulse}
                className="h-3 w-16 bg-secondary rounded"
              />
            </div>

            <div className="sm:col-span-9">
              <motion.div
                {...pulse}
                className="h-8 w-3/4 bg-secondary rounded mb-4"
              />

              <div className="space-y-2 mb-4">
                <motion.div
                  {...pulse}
                  className="h-4 w-full bg-secondary rounded"
                />
                <motion.div
                  {...pulse}
                  className="h-4 w-5/6 bg-secondary rounded"
                />
              </div>

              <div className="flex gap-2">
                <motion.div
                  {...pulse}
                  className="h-3 w-12 bg-secondary rounded"
                />
                <motion.div
                  {...pulse}
                  className="h-3 w-12 bg-secondary rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "blog-post") {
    return (
      <article className={className}>
        <section className="border-b border-border py-16 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <motion.div
                  {...pulse}
                  className="h-3 w-24 bg-secondary rounded"
                />
                <span className="text-muted-foreground">•</span>
                <motion.div
                  {...pulse}
                  className="h-3 w-20 bg-secondary rounded"
                />
              </div>

              <div className="flex flex-col items-center gap-3 mb-8">
                <motion.div
                  {...pulse}
                  className="h-10 w-full bg-secondary rounded md:h-14"
                />
                <motion.div
                  {...pulse}
                  className="h-10 w-3/4 bg-secondary rounded md:h-14"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    {...pulse}
                    className="h-4 w-12 bg-secondary rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-12">
          <div className="mx-auto max-w-3xl overflow-hidden">
            <motion.div {...pulse} className="aspect-2/1 w-full bg-secondary" />
          </div>
        </section>

        <section className="container-x py-12">
          <div className="mx-auto max-w-prose-col flex flex-col items-center space-y-3">
            <motion.div
              {...pulse}
              className="h-6 w-full bg-secondary rounded"
            />
            <motion.div {...pulse} className="h-6 w-5/6 bg-secondary rounded" />
          </div>
        </section>

        <section className="container-x pb-16 md:pb-20">
          <div className="mx-auto max-w-prose-col space-y-6">
            {[1, 2, 3].map((paragraph) => (
              <div key={paragraph} className="space-y-3">
                <motion.div
                  {...pulse}
                  className="h-4 w-full bg-secondary rounded"
                />
                <motion.div
                  {...pulse}
                  className="h-4 w-full bg-secondary rounded"
                />
                <motion.div
                  {...pulse}
                  className="h-4 w-full bg-secondary rounded"
                />
                <motion.div
                  {...pulse}
                  className="h-4 w-2/3 bg-secondary rounded"
                />
              </div>
            ))}
          </div>
        </section>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <div className={`space-y-4 ${className}`}>
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="flex gap-4 border-b border-border pb-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-12 w-12 bg-secondary rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-1/3" />
                <div className="h-3 bg-secondary rounded w-2/3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "article") {
    return (
      <div className={`space-y-12 ${className}`}>
        <motion.div
          {...pulse}
          className="h-[40vh] md:h-[60vh] w-full bg-secondary border-y border-border"
        />

        <div className="mx-auto max-w-monograph px-6 lg:px-10 space-y-8">
          <div className="space-y-4">
            <motion.div {...pulse} className="h-4 w-32 bg-secondary rounded" />

            <motion.div
              {...pulse}
              className="h-12 w-3/4 bg-secondary rounded md:h-16"
            />
          </div>

          <div className="space-y-3">
            <motion.div
              {...pulse}
              className="h-4 w-full bg-secondary rounded"
            />
            <motion.div {...pulse} className="h-4 w-5/6 bg-secondary rounded" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
