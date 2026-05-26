"use client";

// 100% reliable translations — no Context, no useCallback, no stale closures
// FR messages are imported directly and used immediately

import FR from "./fr-messages";
import EN from "./translations/en";
import IT from "./translations/it";
import ES from "./translations/es";
import PT from "./translations/pt";
import AR from "./translations/ar";
import WO from "./translations/wo";

export type Locale = "fr" | "en" | "it" | "es" | "pt" | "ar" | "wo";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "wo", label: "Wolof", flag: "🇸🇳" },
];

function flattenMessages(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const k of Object.keys(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(result, flattenMessages(v, key));
    } else if (Array.isArray(v)) {
      v.forEach((item: any, i: number) => {
        if (item && typeof item === "object") {
          Object.assign(result, flattenMessages(item, `${key}.${i}`));
        } else {
          result[`${key}.${i}`] = String(item);
        }
      });
    } else if (typeof v === "string") {
      result[key] = v;
    }
  }
  return result;
}

// All messages pre-flattened at module load time
export const ALL_MSGS: Record<string, Record<string, string>> = {
  fr: FR,
  en: flattenMessages(EN),
  it: flattenMessages(IT),
  es: flattenMessages(ES),
  pt: flattenMessages(PT),
  ar: flattenMessages(AR),
  wo: flattenMessages(WO),
};
