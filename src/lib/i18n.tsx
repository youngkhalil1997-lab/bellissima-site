"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ═══════════════════════════════════════════
// Toutes les traductions — flat key → text
// Ces données sont chargées côté client uniquement
// ═══════════════════════════════════════════

type Locale = "fr" | "en" | "it" | "es" | "pt" | "ar" | "wo";

interface LocaleMeta {
  code: Locale;
  label: string;
  flag: string;
}

const LOCALES: LocaleMeta[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "wo", label: "Wolof", flag: "🇸🇳" },
];

// ═══════════════════════════════════════════
// Données de traduction — importées avec flatten
// ═══════════════════════════════════════════
import EN from "./translations/en";
import IT from "./translations/it";
import ES from "./translations/es";
import PT from "./translations/pt";
import AR from "./translations/ar";
import WO from "./translations/wo";

function flatten(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const k of Object.keys(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(result, flatten(v, key));
    } else if (Array.isArray(v)) {
      v.forEach((item: any, i: number) => {
        if (item && typeof item === "object") {
          Object.assign(result, flatten(item, `${key}.${i}`));
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

// FR messages — inline car le SSR ne charge pas les imports de client components
const FR: Record<string, string> = {
  "hero.dakar": "à Dakar",
  "hero.laverie": "Laverie",
  "hero.premium": "Premium",
  "hero.digitale": "Digitale",
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
  "testimonials.list.0.text": "Enfin une laverie fiable à Dakar ! Je peux payer depuis Wave et suivre ma commande en temps réel. Le linge est toujours parfaitement plié. Je recommande vivement.",
  "testimonials.list.0.author": "Aminata S.",
  "testimonials.list.1.text": "Le service de lavage-repassage est excellent. Mes chemises n'ont jamais été aussi bien repassées. Et la rapidité est incroyable : 45 minutes montre en main.",
  "testimonials.list.1.author": "Moussa D.",
  "testimonials.list.2.text": "Je suis une cliente fidèle depuis l'ouverture. La qualité du nettoyage à sec est remarquable. Mes robes fragiles sont traitées avec beaucoup de soin. Merci Bellissima !",
  "testimonials.list.2.author": "Fatou K.",
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
  "counters.avis": "4.8/5 — Plus de 1 200 avis",
  "counters.villes": "Dakar et environs",
  "cta.title": "Prêt à simplifier votre lessive ?",
  "cta.subtitle": "Rejoignez des milliers de clients satisfaits à Dakar. Déposez votre linge et profitez de votre temps libre.",
  "cta.services": "Découvrir nos services",
  "cta.contact": "Nous contacter",
  "nav.accueil": "Accueil",
  "nav.services": "Services",
  "nav.fidelite": "Fidélité",
  "nav.contact": "Contact",
  "nav.faq": "FAQ",
  "nav.paiement": "Paiement",
  "services.badge": "Nos services",
  "services.title": "Des solutions de lavage sur mesure",
  "services.subtitle": "Du lavage simple au nettoyage à sec, nous avons la formule qu'il vous faut pour chaque type de vêtement.",
  "services.plans.0.name": "Lavage Simple",
  "services.plans.0.price": "2 500",
  "services.plans.0.features.0": "Lavage en machine standard",
  "services.plans.0.features.1": "Séchage inclus",
  "services.plans.0.features.2": "Pliage soigné",
  "services.plans.1.name": "Lavage + Repassage",
  "services.plans.1.price": "3 500",
  "services.plans.1.features.0": "Lavage en machine premium",
  "services.plans.1.features.1": "Séchage inclus",
  "services.plans.1.features.2": "Repassage professionnel",
  "services.plans.1.features.3": "Pliage sur cintre",
  "services.plans.2.name": "Nettoyage à Sec",
  "services.plans.2.price": "4 000",
  "services.plans.2.features.0": "Nettoyage à sec délicat",
  "services.plans.2.features.1": "Détachage inclus",
  "services.plans.2.features.2": "Repassage sur mesure",
  "services.plans.2.features.3": "Emballage soigné",
  "services.plans.2.features.4": "Livraison gratuite",
  "services.extras.0.title": "Détachage",
  "services.extras.0.desc": "Traitement professionnel des taches tenaces. Nous redonnons vie à vos vêtements préférés.",
  "services.extras.1.title": "Service Client",
  "services.extras.1.desc": "Une équipe dédiée à votre écoute. Du ramassage à la livraison, nous sommes là pour vous.",
  "services.extras.2.title": "Livraison",
  "services.extras.2.desc": "Service de livraison à domicile disponible. Nous venons chercher et rapportons votre linge propre.",
  "services.extras.3.title": "Abonnement",
  "services.extras.3.desc": "Formules d'abonnement pour les professionnels. Un service régulier à prix négocié.",
  "paiement.title": "Réservez et payez en ligne",
  "paiement.subtitle": "Choisissez votre machine et votre mode de paiement en toute simplicité.",
  "paiement.badge": "Paiement",
  "paiement.steps.machine": "Machine",
  "paiement.steps.payment": "Paiement",
  "paiement.steps.confirm": "Confirmation",
  "paiement.machines.0.name": "Petite Machine",
  "paiement.machines.0.price": "2 500",
  "paiement.machines.0.kg": "7 kg",
  "paiement.machines.0.time": "45 min",
  "paiement.machines.1.name": "Machine Standard",
  "paiement.machines.1.price": "3 000",
  "paiement.machines.1.kg": "12 kg",
  "paiement.machines.1.time": "60 min",
  "paiement.machines.2.name": "Grande Machine",
  "paiement.machines.2.price": "3 500",
  "paiement.machines.2.kg": "18 kg",
  "paiement.machines.2.time": "75 min",
  "paiement.choose": "Choisir",
  "paiement.payment.choose_method": "Choisissez votre moyen de paiement",
  "paiement.confirm.title": "Confirmer votre réservation",
  "paiement.confirm.submit": "Confirmer et payer",
  "paiement.confirm.modify": "Modifier le moyen de paiement",
  "paiement.back.retour": "Retour",
  "paiement.confirm.machine_label": "Machine",
  "paiement.confirm.price_label": "Prix",
  "paiement.confirm.method_label": "Paiement",
  "contact.title": "Contactez-nous",
  "contact.subtitle": "Une question, une suggestion ? Notre équipe est à votre écoute.",
  "contact.validation.name_min": "Le nom doit contenir au moins 2 caractères",
  "contact.validation.phone_invalid": "Le numéro de téléphone est invalide",
  "contact.validation.email_invalid": "Email invalide",
  "contact.validation.message_min": "Le message doit contenir au moins 10 caractères",
  "contact.form.name.label": "Nom complet",
  "contact.form.name.placeholder": "Votre nom",
  "contact.form.phone.label": "Téléphone",
  "contact.form.phone.placeholder": "Votre numéro",
  "contact.form.email.label": "Email (optionnel)",
  "contact.form.email.placeholder": "votre@email.com",
  "contact.form.message.label": "Message",
  "contact.form.message.placeholder": "Votre message",
  "contact.form.submit": "Envoyer",
  "contact.form.success": "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
  "contact.form.error": "Erreur lors de l'envoi. Veuillez réessayer.",
  "contact.form.connection_error": "Erreur de connexion. Vérifiez votre réseau et réessayez.",
  "contact.info.0.label": "Adresse",
  "contact.info.0.value": "Dakar, Sénégal",
  "contact.info.1.label": "Horaires",
  "contact.info.1.value": "Lun-Sam : 7h-22h | Dim : 9h-18h",
  "contact.info.2.label": "WhatsApp",
  "contact.info.2.value": "+221 77 000 0001",
  "contact.info.3.label": "Email",
  "contact.info.3.value": "contact@bellissima.sn",
  "contact.info.4.label": "Réseaux",
  "contact.info.4.value": "@bellissimasn",
  "services.plans.0.cta": "Choisir cette formule",
  "services.plans.1.cta": "Choisir cette formule",
  "services.plans.2.cta": "Choisir cette formule",
  "services.extras.title": "Tout ce que nous vous offrons",
  "common.language": "Langue",

  // Fidélité
  "fidelite.badge": "Programme fidélité",
  "fidelite.title": "10 lavages = 1 offert",
  "fidelite.subtitle": "+ avantages exclusifs réservés aux membres",
  "fidelite.counter.label": "Lavages = 1 OFFERT",
  "fidelite.counter.desc": "Chaque 10e lavage est gratuit. Le compteur se remet automatiquement à zéro. Valable sur toutes les machines.",
  "fidelite.counter.progress": "6 / 10 lavages",
  "fidelite.signup.title": "Inscription gratuite",
  "fidelite.signup.name.label": "Votre nom",
  "fidelite.signup.name.placeholder": "Jean Dupont",
  "fidelite.signup.phone.label": "Votre téléphone",
  "fidelite.signup.phone.placeholder": "+221 77 XXX XX XX",
  "fidelite.signup.email.label": "Votre email (optionnel)",
  "fidelite.signup.email.placeholder": "jean@email.com",
  "fidelite.signup.submit": "Rejoindre le programme",
  "fidelite.signup.success": "Inscription réussie ! Bienvenue au programme fidélité",
  "fidelite.signup.error": "Erreur. Vérifiez votre téléphone.",
  "fidelite.signup.connection_error": "Erreur de connexion. Réessayez plus tard.",
  "fidelite.perks.title": "Avantages exclusifs",
  "fidelite.perks.0.title": "Réservation prioritaire",
  "fidelite.perks.0.desc": "Réservez votre machine 15 min à l'avance.",
  "fidelite.perks.1.title": "10 = 1 offert",
  "fidelite.perks.1.desc": "10 lavages payés, le 11e est gratuit.",
  "fidelite.perks.2.title": "Offres exclusives",
  "fidelite.perks.2.desc": "Promos et réductions réservées aux membres.",

  // FAQ
  "faq.title": "FAQ",
  "faq.subtitle": "Questions fréquentes sur BELLISSIMA",
  "faq.q0": "Comment réserver une machine ?",
  "faq.a0": "Réservez via notre site ou en vous rendant directement à la laverie. Une caution de 200 FCFA est demandée pour valider votre réservation (non remboursée en cas d'absence).",
  "faq.q1": "Quels sont les modes de paiement acceptés ?",
  "faq.a1": "Nous acceptons Wave, Orange Money, Yas, cartes bancaires (CB/Visa/Mastercard) et espèces.",
  "faq.q2": "La lessive est-elle incluse ?",
  "faq.a2": "Oui, la lessive et l'adoucisseur sont inclus dans chaque formule. Le détachant est proposé en option (+500 FCFA).",
  "faq.q3": "Combien de temps dure un cycle ?",
  "faq.a3": "Lavage + séchage complet en 1h à 1h30 selon la formule choisie.",
  "faq.q4": "Quels sont vos horaires d'ouverture ?",
  "faq.a4": "Nous sommes ouverts 7j/7, de 7h00 à 23h00.",
  "faq.q5": "Puis-je laisser mon linge et revenir plus tard ?",
  "faq.a5": "Oui, vous pouvez déposer votre linge et repasser plus tard. Nous vous informons par notification dès que c'est prêt.",
  "faq.q6": "Proposez-vous un service de livraison ?",
  "faq.a6": "Pour le moment, le service est en self-service et retrait sur place. La livraison est en cours de déploiement.",

  // Footer
  "footer.brand.desc": "Laverie premium 100% digitale à Dakar. Lavage et séchage professionnels en 1h–1h30, 100% digital, simple et sécurisé.",
  "footer.brand.wifi": "WiFi gratuit sur place",
  "footer.nav.title": "Navigation",
  "footer.services.title": "Services",
  "footer.services.0": "Lavage premium 1h–1h30",
  "footer.services.1": "Séchage professionnel",
  "footer.services.2": "Repassage sur place",
  "footer.services.3": "Livraison à domicile",
  "footer.services.4": "Abonnement pro",
  "footer.contact.title": "Contact",
  "footer.contact.address": "Dakar, Sénégal",
  "footer.contact.hours": "Lun — Dim : 07h00 – 23h00",
  "footer.contact.phone": "+221 77 000 00 01",
  "footer.contact.email": "contact@bellissima.sn",
  "footer.bottom.tagline": "Confort · Propreté · Modernité",
};

// Toutes les langues flat
const ALL: Record<string, Record<string, string>> = {
  fr: FR,
  en: flatten(EN),
  it: flatten(IT),
  es: flatten(ES),
  pt: flatten(PT),
  ar: flatten(AR),
  wo: flatten(WO),
};

// ═══════════════════════════════════════════
// Contexte
// ═══════════════════════════════════════════

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  locales: LocaleMeta[];
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nCtx>({
  locale: "fr",
  setLocale: () => {},
  t: (k: string) => FR[k] || k.split(".").pop() || k,
  locales: LOCALES,
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("bellissima-locale") as Locale | null;
    if (stored && stored in ALL) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("bellissima-locale", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  const t = (key: string): string => {
    const map = ALL[locale] || FR;
    return map[key] || FR[key] || key.split(".").pop() || key;
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Ctx.Provider value={{ locale, setLocale, t, locales: LOCALES, dir }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  return useContext(Ctx);
}
