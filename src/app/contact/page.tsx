"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { useI18nReplace, useI18n } from "@/hooks/useI18nReplace";
import { ClockIcon, PaperAirplaneIcon, WifiIcon, PhoneIcon, CheckIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Le numéro de téléphone est invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPinIcon,
    label: "Adresse", labelKey: "contact.info.0.label",
    value: "Dakar, Sénégal", valueKey: "contact.info.0.value",
  },
  {
    icon: ClockIcon,
    label: "Horaires", labelKey: "contact.info.1.label",
    value: "Lun-Sam : 7h-22h | Dim : 9h-18h", valueKey: "contact.info.1.value",
  },
  {
    icon: PhoneIcon,
    label: "WhatsApp", labelKey: "contact.info.2.label",
    value: "+221 77 000 0001", valueKey: "contact.info.2.value",
    href: "https://wa.me/221770000001",
  },
  {
    icon: EnvelopeIcon,
    label: "Email", labelKey: "contact.info.3.label",
    value: "contact@bellissima.sn", valueKey: "contact.info.3.value",
    href: "mailto:contact@bellissima.sn",
  },
  {
    icon: WifiIcon,
    label: "Réseaux", labelKey: "contact.info.4.label",
    value: "@bellissimasn", valueKey: "contact.info.4.value",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { t } = useI18n();
  useI18nReplace();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const contactSchemaI18n = z.object({
    name: z.string().min(2, t("contact.validation.name_min")),
    phone: z.string().min(8, t("contact.validation.phone_invalid")),
    email: z.string().email(t("contact.validation.email_invalid")).optional().or(z.literal("")),
    message: z.string().min(10, t("contact.validation.message_min")),
  });

  const {
    register: registerI18n,
    handleSubmit: handleSubmitI18n,
    reset: resetI18n,
    formState: { errors: errorsI18n },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchemaI18n),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.ok) {
        setStatus("success");
        setMessage(t("contact.form.success"));
        resetI18n();
      } else {
        setStatus("error");
        setMessage(t("contact.form.error"));
      }
    } catch {
      setStatus("error");
      setMessage(t("contact.form.connection_error"));
    }
  };

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0077B6]/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-i18n="contact.title">Contactez-nous</h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto" data-i18n="contact.subtitle">
              Une question, une suggestion ? Notre équipe est à votre écoute.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact info */}
            <AnimatedSection direction="left">
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0077B6]/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-muted)]" data-i18n={info.labelKey}>{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--text-primary)] hover:text-[#0077B6] transition-colors"
                          data-i18n={info.valueKey}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[var(--text-primary)]" data-i18n={info.valueKey}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right">
              <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmitI18n(onSubmit)} className="space-y-5">
                  <Input
                    label={t("contact.form.name.label")}
                    placeholder={t("contact.form.name.placeholder")}
                    error={errorsI18n.name?.message}
                    icon={<EnvelopeIcon className="w-4 h-4" />}
                    {...registerI18n("name")}
                  />
                  <Input
                    label={t("contact.form.phone.label")}
                    placeholder={t("contact.form.phone.placeholder")}
                    type="tel"
                    error={errorsI18n.phone?.message}
                    icon={<PhoneIcon className="w-4 h-4" />}
                    {...registerI18n("phone")}
                  />
                  <Input
                    label={t("contact.form.email.label")}
                    placeholder={t("contact.form.email.placeholder")}
                    type="email"
                    error={errorsI18n.email?.message}
                    icon={<EnvelopeIcon className="w-4 h-4" />}
                    {...registerI18n("email")}
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[var(--text-muted)]" data-i18n="contact.form.message.label">
                      Message
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] transition-all duration-200 focus:outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 resize-y min-h-[120px]"
                      placeholder={t("contact.form.message.placeholder")}
                      rows={4}
                      {...registerI18n("message")}
                    />
                    {errorsI18n.message && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        {errorsI18n.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    size="lg"
                    loading={status === "loading"}
                    data-i18n="contact.form.submit"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Envoyer
                  </Button>
                  {message && (
                    <div
                      className={`p-3 rounded-lg text-sm text-center ${
                        status === "success"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {status === "success" && <CheckIcon className="inline w-4 h-4 mr-1" />}
                      {message}
                    </div>
                  )}
                </form>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
