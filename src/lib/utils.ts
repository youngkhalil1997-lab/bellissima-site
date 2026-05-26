import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne les classes Tailwind avec priorité aux classes utilitaires */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
