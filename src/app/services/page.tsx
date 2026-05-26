"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { SparklesIcon, CheckIcon, TruckIcon, CalendarDaysIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useI18nReplace } from "@/hooks/useI18nReplace";

const plans = [
  {
    name: "Lavage Simple", nameKey: "services.plans.0.name",
    price: "2 500",
    period: "FCFA",
    features: [
      { text: "Lavage en machine standard", key: "services.plans.0.features.0" },
      { text: "Séchage inclus", key: "services.plans.0.features.1" },
      { text: "Pliage soigné", key: "services.plans.0.features.2" },
    ],
    popular: false,
  },
  {
    name: "Lavage + Repassage", nameKey: "services.plans.1.name",
    price: "3 500",
    period: "FCFA",
    features: [
      { text: "Lavage en machine premium", key: "services.plans.1.features.0" },
      { text: "Séchage inclus", key: "services.plans.1.features.1" },
      { text: "Repassage professionnel", key: "services.plans.1.features.2" },
      { text: "Pliage sur cintre", key: "services.plans.1.features.3" },
    ],
    popular: true,
  },
  {
    name: "Nettoyage à Sec", nameKey: "services.plans.2.name",
    price: "4 000",
    period: "FCFA",
    features: [
      { text: "Nettoyage à sec délicat", key: "services.plans.2.features.0" },
      { text: "Détachage inclus", key: "services.plans.2.features.1" },
      { text: "Repassage sur mesure", key: "services.plans.2.features.2" },
      { text: "Emballage soigné", key: "services.plans.2.features.3" },
      { text: "Livraison gratuite", key: "services.plans.2.features.4" },
    ],
    popular: false,
  },
];

const extras = [
  {
    icon: SparklesIcon,
    title: "Détachage", titleKey: "services.extras.0.title",
    desc: "Traitement professionnel des taches tenaces. Nous redonnons vie à vos vêtements préférés.", descKey: "services.extras.0.desc",
  },
  {
    icon: FaceSmileIcon,
    title: "Service Client", titleKey: "services.extras.1.title",
    desc: "Une équipe dédiée à votre écoute. Du ramassage à la livraison, nous sommes là pour vous.", descKey: "services.extras.1.desc",
  },
  {
    icon: TruckIcon,
    title: "Livraison", titleKey: "services.extras.2.title",
    desc: "Service de livraison à domicile disponible. Nous venons chercher et rapportons votre linge propre.", descKey: "services.extras.2.desc",
  },
  {
    icon: CalendarDaysIcon,
    title: "Abonnement", titleKey: "services.extras.3.title",
    desc: "Formules d'abonnement pour les professionnels. Un service régulier à prix négocié.", descKey: "services.extras.3.desc",
  },
];

export default function ServicesPage() {
  useI18nReplace();

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0077B6]/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="gold" className="mb-4" data-i18n="services.badge">Nos services</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-i18n="services.title">
              Des solutions de lavage sur mesure
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto" data-i18n="services.subtitle">
              Du lavage simple au nettoyage à sec, nous avons la formule qu&apos;il vous faut pour chaque type de vêtement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {plans.map((plan, idx) => (
              <AnimatedCard key={plan.name} className={plan.popular ? "md:-mt-4" : ""}>
                <Card
                  variant={plan.popular ? "gold-border" : "default"}
                  className="flex flex-col h-full"
                >
                  {!plan.popular && <div className="h-6" />}
                  <h3 className="text-lg font-semibold text-center" data-i18n={plan.nameKey}>{plan.name}</h3>
                  <div className="text-center my-4">
                    <span className="text-4xl font-bold text-[#D4AF37]">{plan.price}</span>
                    <span className="text-sm text-[var(--text-muted)] ml-1">{plan.period}</span>
                  </div>
                  <ul className="flex-1 space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.key} className="flex items-start gap-2 text-sm text-[var(--text-muted)]" data-i18n={f.key}>
                        <CheckIcon className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "gold" : "primary"}
                    href={`/paiement?machine=${idx}`}
                    className="w-full justify-center mt-auto"
                    data-i18n={"services.plans." + idx + ".cta"}
                  >
                    Choisir cette formule
                  </Button>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-i18n="services.extras.title">Tout ce que nous vous offrons</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extras.map((extra, idx) => (
              <AnimatedCard key={extra.title}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                    <extra.icon className="w-6 h-6 text-[#0077B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n={extra.titleKey}>{extra.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed" data-i18n={extra.descKey}>{extra.desc}</p>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
