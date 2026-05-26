"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { useCountUp } from "@/hooks/useAnimations";
import { GiftIcon, StarIcon, SparklesIcon, CheckIcon, EnvelopeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useI18nReplace, useI18n } from "@/hooks/useI18nReplace";

const perks = [
  {
    icon: CalendarDaysIcon,
    title: "Réservation prioritaire", titleKey: "fidelite.perks.0.title",
    desc: "Réservez votre machine 15 min à l'avance.", descKey: "fidelite.perks.0.desc",
  },
  {
    icon: GiftIcon,
    title: "10 = 1 offert", titleKey: "fidelite.perks.1.title",
    desc: "10 lavages payés, le 11e est gratuit.", descKey: "fidelite.perks.1.desc",
  },
  {
    icon: EnvelopeIcon,
    title: "Offres exclusives", titleKey: "fidelite.perks.2.title",
    desc: "Promos et réductions réservées aux membres.", descKey: "fidelite.perks.2.desc",
  },
];

export default function FidelitePage() {
  const { t } = useI18n();
  useI18nReplace();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const countRef = useCountUp(10, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/signup-loyalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.id) {
        setStatus("success");
        setMessage(t("fidelite.signup.success"));
        setFormData({ name: "", phone: "", email: "" });
      } else {
        setStatus("error");
        setMessage(t("fidelite.signup.error"));
      }
    } catch {
      setStatus("error");
      setMessage(t("fidelite.signup.connection_error"));
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Badge variant="gold" className="mb-4" data-i18n="fidelite.badge">
              <SparklesIcon className="w-3 h-3" />
              Programme fidélité
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-i18n="fidelite.title">
              10 lavages = 1 offert
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto" data-i18n="fidelite.subtitle">
              + avantages exclusifs réservés aux membres
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Counter card */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <AnimatedCard>
              <Card variant="gold-border" className="text-center py-8">
                <div
                  ref={countRef}
                  className="text-6xl md:text-7xl font-bold text-[#D4AF37] font-mono"
                >
                  0
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] mt-3" data-i18n="fidelite.counter.label">Lavages = 1 OFFERT</h3>
                <p className="text-sm text-[var(--text-muted)] mt-3 max-w-sm mx-auto leading-relaxed" data-i18n="fidelite.counter.desc">
                  Chaque 10<sup>e</sup> lavage est gratuit. Le compteur se remet automatiquement à zéro.
                  Valable sur toutes les machines.
                </p>
                <div className="mt-6 w-full bg-[var(--bg-card)] rounded-full h-2 overflow-hidden">
                  <div className="w-3/5 h-full rounded-full bg-gradient-to-r from-[#0077B6] to-[#D4AF37]" />
                </div>
                <p className="text-xs text-[var(--text-dim)] mt-2" data-i18n="fidelite.counter.progress">6 / 10 lavages</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Inscription */}
      <section className="py-16 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-center mb-8" data-i18n="fidelite.signup.title">Inscription gratuite</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t("fidelite.signup.name.label")}
                  placeholder={t("fidelite.signup.name.placeholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label={t("fidelite.signup.phone.label")}
                  placeholder={t("fidelite.signup.phone.placeholder")}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  label={t("fidelite.signup.email.label")}
                  placeholder={t("fidelite.signup.email.placeholder")}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Button
                  type="submit"
                  variant="gold"
                  className="w-full justify-center"
                  loading={status === "loading"}
                  data-i18n="fidelite.signup.submit"
                >
                  <StarIcon className="w-4 h-4" />
                  Rejoindre le programme
                </Button>
              </form>
              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm text-center ${
                    status === "success"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                  }`}
                >
                  {status === "success" && <CheckIcon className="inline w-4 h-4 mr-1" />}
                  {message}
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-i18n="fidelite.perks.title">Avantages exclusifs</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {perks.map((perk) => (
              <AnimatedCard key={perk.title}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
                    <perk.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n={perk.titleKey}>{perk.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]" data-i18n={perk.descKey}>{perk.desc}</p>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
