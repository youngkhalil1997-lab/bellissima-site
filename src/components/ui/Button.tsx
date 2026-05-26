"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
type ButtonVariant = "primary" | "gold" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconAfter?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0077B6] text-white hover:bg-[#0099E6] shadow-lg shadow-[#0077B6]/20 hover:shadow-[#0077B6]/30 active:scale-[0.98]",
  gold:
    "bg-[#D4AF37] text-[#0a0a0f] hover:bg-[#E6C84C] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[#0077B6] hover:text-[var(--text-primary)]",
  outline:
    "bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0f]",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

const defaultIcons: Record<ButtonVariant, React.ReactNode | null> = {
  primary: <ArrowRightIcon className="w-4 h-4" />,
  gold: <SparklesIcon className="w-4 h-4" />,
  ghost: null,
  outline: null,
  danger: <XMarkIcon className="w-4 h-4" />,
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconAfter = false,
  href,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-lg",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6]/50",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        icon
      ) : !iconAfter && defaultIcons[variant] ? (
        defaultIcons[variant]
      ) : null}
      {children}
      {iconAfter && (icon || (defaultIcons[variant] && variant !== "ghost" && variant !== "outline" && variant !== "danger") ? defaultIcons[variant] : null)}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(props as React.HTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
