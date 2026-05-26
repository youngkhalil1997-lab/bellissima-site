"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SlideshowImage {
  src: string;
  alt: string;
}

interface Props {
  images: SlideshowImage[];
  interval?: number;
}

export function HeroSlideshow({ images, interval = 5000 }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images.length, interval]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Images with crossfade — all stacked, only one visible via opacity */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === current ? 1 : 0 }}
          loading={idx === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/80 via-[#001529]/70 to-[#0a0a0f]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0077B6_0%,_transparent_60%)] opacity-30" />
    </div>
  );
}
