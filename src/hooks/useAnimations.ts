"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook pour animer les éléments au scroll avec GSAP ScrollTrigger
 */
export function useScrollReveal(options?: {
  trigger?: string;
  start?: string;
  end?: string;
  toggleActions?: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        y: options?.y ?? 40,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 0.7,
        stagger: options?.stagger ?? 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 85%",
          end: options?.end ?? "top 40%",
          toggleActions: options?.toggleActions ?? "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook pour l'effet parallaxe au scroll
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `${speed * 100}px`,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Hook pour compter de 0 à une valeur cible
 */
export function useCountUp(
  target: number,
  duration: number = 2,
  startOnView: boolean = true
) {
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      const anim = gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: startOnView
          ? {
              trigger: el,
              start: "top 90%",
              once: true,
              onEnter: () => { counted.current = true; },
            }
          : undefined,
        onUpdate: () => {
          el!.textContent = Math.round(obj.val).toLocaleString("fr-FR");
        },
      });

      if (!startOnView) anim.play();
    });

    return () => ctx.revert();
  }, [target, duration, startOnView]);

  return ref;
}

/**
 * Hook 3D tilt pour les cartes
 */
export function useTilt(maxTilt: number = 8) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}
