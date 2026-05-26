"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const variantStyles = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl h-48",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--bg-card)]",
        variantStyles[variant],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
