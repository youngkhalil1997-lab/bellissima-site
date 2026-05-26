"use client";

import { useEffect, useRef, useCallback } from "react";
import { useI18n, I18nProvider } from "@/lib/i18n";
export { useI18n, I18nProvider };

/**
 * Hook qui remplace UNIQUEMENT les textNodes des éléments marqués data-i18n.
 * Préserve les icônes SVG, spans, et autres nœuds enfants.
 */
export function useI18nReplace() {
  const { locale, t } = useI18n();
  const initialized = useRef(false);

  const replaceText = useCallback((targetLocale?: string) => {
    const l = targetLocale || locale;

    const els = document.querySelectorAll("[data-i18n]");
    els.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const translated = t(key);
      if (!translated || translated === key) return;

      // Remplacer UNIQUEMENT les textNodes, pas les SVG/icons enfants
      let hasTextNode = false;
      el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (text.trim() && text.trim() !== translated.trim()) {
            node.textContent = translated;
            hasTextNode = true;
          }
        }
      });

      // Si aucun textNode trouvé, remplacer tout le contenu (sans SVG)
      if (!hasTextNode && !el.querySelector("svg")) {
        el.textContent = translated;
      }
    });
  }, [locale, t]);

  // Au montage : remplacer si locale stockée n'est pas FR
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stored = localStorage.getItem("bellissima-locale");
    if (stored && stored !== "fr") {
      // Attendre l'hydratation complète + animations
      const timer = setTimeout(() => replaceText(stored), 100);
      return () => clearTimeout(timer);
    }
  }, [replaceText]);

  // Quand la locale change (clic sur drapeau)
  useEffect(() => {
    if (initialized.current) {
      replaceText();
    }
  }, [locale, replaceText]);

  return { replace: replaceText };
}
