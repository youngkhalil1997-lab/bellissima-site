"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-muted)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-sm",
              "text-[var(--text-primary)] placeholder:text-[var(--text-dim)]",
              "transition-all duration-200",
              "focus:outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              icon && "pl-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-xs text-red-500"
            role="alert"
          >
            <ExclamationCircleIcon className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
