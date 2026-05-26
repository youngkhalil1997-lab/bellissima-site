"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.98)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
