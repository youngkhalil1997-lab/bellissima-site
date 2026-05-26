"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface GalleryItem {
  src: string;
  alt: string;
}

interface Props {
  items: GalleryItem[];
  interval?: number;
}

export function GalleryCarousel({ items, interval = 4000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);
  }, [items.length, interval]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? "right" : "left");
    setCurrent(idx);
    startTimer();
  };

  const prev = () => goTo((current - 1 + items.length) % items.length);
  const next = () => goTo((current + 1) % items.length);

  if (items.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[#0a0a0f]/80" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-[#0077B6]/10">
          {/* Images container */}
          <div className="relative aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-[#0a0a0f]">
            {items.map((item, idx) => (
              <img
                key={idx}
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                style={{
                  opacity: idx === current ? 1 : 0,
                  transform: idx === current ? "scale(1)" : "scale(1.05)",
                }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 hover:border-[#0077B6]/50 transition-all"
            aria-label="Image précédente"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 hover:border-[#0077B6]/50 transition-all"
            aria-label="Image suivante"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-[#D4AF37] w-6"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
