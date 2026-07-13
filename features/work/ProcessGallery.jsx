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
  }, [openIndex, images.length]);

  if (!images.length) return null;

  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <section className="border-t border-border py-16 md:py-20 relative">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <p className="label-meta mb-8">Process</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 grain-exempt">
          {images.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative grain-exempt aspect-4/3 overflow-hidden border border-border bg-secondary cursor-zoom-in"
            >
              <Image
                src={urlFor(item.image).width(800).height(600).url()}
                alt={item.alt || item.caption || `Process shot ${i + 1}`}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 z-1010 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/10"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 top-1/2 z-1010 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 top-1/2 z-1010 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-screen flex-col items-center justify-center"
          >
            <img
              src={urlFor(current.image).width(2000).url()}
              alt={current.alt || current.caption}
              className="max-h-[80vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
            />
            {current.caption && (
              <p className="mt-6 max-w-2xl text-center font-body text-base text-white/80">
                {current.caption}
              </p>
            )}
            <p className="mt-2 text-xs tracking-widest text-white/40 uppercase">
              {openIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProcessGallery;
