"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

const ProcessGallery = ({ images = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  const showNext = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, images.length]);

  if (!images.length) return null;

  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <p className="label-meta mb-8">Process</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label="View larger image"
              className="group grain-exempt aspect-4/3 overflow-hidden border border-border bg-secondary"
            >
              <Image
                src={urlFor(item.image).width(800).height(600).url()}
                alt={item.alt || item.caption || `Process shot ${i + 1}`}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {item.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-background/80 px-3 py-2 text-left text-xs text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10 md:right-8 md:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10 md:left-8"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10 md:right-8"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-5xl"
          >
            <img
              src={urlFor(current.image).width(2000).url()}
              alt={
                current.alt ||
                current.caption ||
                `Process shot ${openIndex + 1}`
              }
              className="max-h-[85vh] w-full object-contain"
            />
            {current.caption && (
              <p className="mt-3 text-center text-sm text-white/70">
                {current.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProcessGallery;
