"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Locale = "fr" | "en" | "it" | "es" | "pt" | "ar" | "wo";

const LOCALES_META: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "wo", label: "Wolof", flag: "🇸🇳" },
];

// ═══════════════════════════════════════════════
// FR messages — inline, pas d'import externe
// ═══════════════════════════════════════════════
const _FR: Record<string, string> = {
  "hero.laverie": "Laverie",
  "hero.digitale": "Digitale",
  "hero.premium": "Premium",
  "hero.dakar": "à Dakar",
  "hero.subtitle": "Déposez votre linge, nous faisons le reste. Une expérience de lavage connectée, rapide et fiable.",
  "hero.cta_offres": "Voir nos offres",
  "hero.cta_paiement": "Paiement en ligne",
  "features.badge": "Pourquoi nous choisir",
  "features.title": "Une laverie intelligente à votre service",
  "features.subtitle": "Nous combinons technologie de pointe et service premium pour vous offrir la meilleure expérience de lavage à Dakar.",
  "features.cards.0.title": "Paiement Mobile",
  "features.cards.0.desc": "Payez en toute sécurité depuis votre téléphone via Wave, Orange Money, Free Money ou carte bancaire. Plus besoin d'espèces.",
  "features.cards.1.title": "Suivi en Temps Réel",
  "features.cards.1.desc": "Recevez des notifications à chaque étape : lavage, séchage, pliage. Vous savez exactement quand votre linge est prêt.",
  "features.cards.2.title": "Qualité Premium",
  "features.cards.2.desc": "Machines industrielles de pointe, détergents hypoallergéniques et cycles adaptés à chaque type de tissu. Un résultat impeccable à chaque fois.",
  "features.cards.3.title": "Service Rapide",
  "features.cards.3.desc": "Lavage express en 45 minutes ou service standard. Notre système optimisé réduit votre temps d'attente au minimum.",
  "steps.badge": "Comment ça marche",
  "steps.title": "Trois étapes simples pour un linge impeccable",
  "steps.list.0.title": "1. Choisissez votre formule",
  "steps.list.0.desc": "Sélectionnez le service qui vous convient : lavage simple, lavage-repassage ou nettoyage à sec. Indiquez le poids de votre linge.",
  "steps.list.1.title": "2. Déposez votre linge",
  "steps.list.1.desc": "Apportez votre linge à notre laverie. Nos agents le pèsent, l'étiquettent et le prennent en charge immédiatement.",
  "steps.list.2.title": "3. Récupérez-le frais et plié",
  "steps.list.2.desc": "Recevez une notification quand c'est prêt. Venez récupérer votre linge parfaitement lavé, séché et plié. Simple comme bonjour.",
  "offers.badge": "Nos offres",
  "offers.title": "Des formules adaptées à tous vos besoins",
  "offers.new": "Nouveau",
  "offers.cards.0.title": "Lavage Simple",
  "offers.cards.0.desc": "Lavage, séchage et pliage. Idéal pour le quotidien. À partir de 2 500 FCFA.",
  "offers.cards.1.title": "Lavage + Repassage",
  "offers.cards.1.desc": "Lavage, séchage et repassage professionnel. Parfait pour vos chemises et vêtements de travail. À partir de 4 000 FCFA.",
  "offers.cards.2.title": "Nettoyage à Sec",
  "offers.cards.2.desc": "Traitement délicat pour vos vêtements fragiles et costumes. Résultat impeccable garanti. À partir de 6 000 FCFA.",
  "testimonials.badge": "Témoignages",
  "testimonials.title": "Ce que nos clients disent de nous",
  "testimonials.list.0.author": "Aminata S.",
  "testimonials.list.0.text": "Enfin une laverie fiable à Dakar ! Je peux payer depuis Wave et suivre ma commande en temps réel. Le linge est toujours parfaitement plié. Je recommande vivement.",
  "testimonials.list.1.author": "Moussa D.",
  "testimonials.list.1.text": "Le service de lavage-repassage est excellent. Mes chemises n'ont jamais été aussi bien repassées. Et la rapidité est incroyable : 45 minutes montre en main.",
  "testimonials.list.2.author": "Fatou K.",
  "testimonials.list.2.text": "Je suis une cliente fidèle depuis l'ouverture. La qualité du nettoyage à sec est remarquable. Mes robes fragiles sont traitées avec beaucoup de soin. Merci Bellissima !",
  "vision.badge": "Notre vision",
  "vision.title": "Réinventer la laverie à Dakar",
  "vision.confiance_title": "Confiance",
  "vision.confiance_desc": "La transparence est au coeur de notre engagement. Paiement sécurisé, suivi en temps réel et aucun frais caché. Votre linge est entre de bonnes mains.",
  "vision.excellence_title": "Excellence",
  "vision.excellence_desc": "Nous utilisons des équipements de pointe et des produits de première qualité pour offrir un résultat irréprochable. Chaque vêtement mérite une attention particulière.",
  "vision.communauté_title": "Communauté",
  "vision.communauté_desc": "Nous croyons en une économie locale forte. Bellissima s'associe aux artisans et commerçants dakarois pour créer un réseau de services de confiance.",
  "counters.clients": "5 000+ clients satisfaits",
  "counters.machines": "20+ machines haut de gamme",
  "counters.villes": "Dakar et environs",
  "counters.avis": "4.8/5 — Plus de 1 200 avis",
  "cta.title": "Prêt à simplifier votre lessive ?",
  "cta.subtitle": "Rejoignez des milliers de clients satisfaits à Dakar. Déposez votre linge et profitez de votre temps libre.",
  "cta.services": "Découvrir nos services",
  "cta.contact": "Nous contacter",
};

// ═══════════════════════════════════════════════
// Autres langues via imports (seront résolus après)
// ═══════════════════════════════════════════════
import EN from "./translations/en";
import IT from "./translations/it";
import ES from "./translations/es";
import PT from "./translations/pt";
import AR from "./translations/ar";
import WO from "./translations/wo";

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

const _ALL: Record<string, Record<string, string>> = {
  fr: _FR,
  en: flattenMessages(EN),
  it: flattenMessages(IT),
  es: flattenMessages(ES),
  pt: flattenMessages(PT),
  ar: flattenMessages(AR),
  wo: flattenMessages(WO),
};

// Fonction de lookup fiable
function _t(key: string, map: Record<string, string>): string {
  return map[key] || _FR[key] || key.split(".").pop() || key;
}

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  locales: typeof LOCALES_META;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<LocaleCtx>({
  locale: "fr", setLocale: () => {},
  t: (k) => _t(k, _FR),
  locales: LOCALES_META, dir: "ltr",
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("bellissima-locale") as Locale | null;
    if (stored && stored in _ALL) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("bellissima-locale", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string): string => {
    return _t(key, _ALL[locale] || _FR);
  }, [locale]);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Ctx.Provider value={{ locale, setLocale, t, locales: LOCALES_META, dir }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLocale() {
  return useContext(Ctx);
}

// Export pour usage direct dans les pages (SSR-safe)
export { _FR, _t };
