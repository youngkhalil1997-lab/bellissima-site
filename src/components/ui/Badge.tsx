"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, StarIcon, SparklesIcon } from "@heroicons/react/24/outline";
type BadgeVariant = "default" | "gold" | "popular" | "success";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)]",
  gold:
    "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30",
  popular:
    "bg-[#D4AF37] text-[#0a0a0f]",
  success:
    "bg-green-500/10 text-green-500 border border-green-500/30",
};

const variantIcons: Record<BadgeVariant, React.ReactNode | null> = {
  default: null,
  gold: <StarIcon className="w-3 h-3" />,
  popular: <SparklesIcon className="w-3 h-3" />,
  success: <CheckCircleIcon className="w-3 h-3" />,
};

export function Badge({
  variant = "default",
  className,
  children,
  ...rest
}: BadgeProps & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {variantIcons[variant]}
      {children}
    </span>
  );
}
