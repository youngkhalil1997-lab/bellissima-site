"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "@heroicons/react/24/outline";
type CardVariant = "default" | "gold-border" | "glass";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[var(--bg-surface)] border border-[var(--border-color)]",
  "gold-border":
    "bg-[var(--bg-surface)] border-2 border-[#D4AF37] relative",
  glass:
    "glass",
};

export function Card({
  variant = "default",
  className,
  children,
  hover = true,
  onClick,
  style,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        variantStyles[variant],
        hover && !onClick && "hover:border-[#0077B6] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0077B6]/10",
        hover && onClick && "cursor-pointer hover:border-[#0077B6] hover:-translate-y-1",
        variant === "gold-border" && "hover:border-[#D4AF37]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {variant === "gold-border" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0a0a0f] px-4 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap">
          <SparklesIcon className="w-3 h-3" />
          Populaire
        </div>
      )}
      {children}
    </div>
  );
}
