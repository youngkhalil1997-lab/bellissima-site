"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { PageTransition } from "@/components/animations/PageTransition";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useI18nReplace, useI18n } from "@/hooks/useI18nReplace";

const faqData = [
  { qKey: "faq.q0", aKey: "faq.a0" },
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
  { qKey: "faq.q6", aKey: "faq.a6" },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();
  useI18nReplace();

  return (
    <PageTransition>
      <section className="relative py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-i18n="faq.title">
                <span className="text-[#0077B6]">FAQ</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto" data-i18n="faq.subtitle">
                Questions fréquentes sur BELLISSIMA
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/5"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-medium text-base" data-i18n={item.qKey}>{t(item.qKey)}</span>
                    {openIndex === i ? (
                      <MinusIcon className="w-5 h-5 shrink-0 text-[#D4AF37]" />
                    ) : (
                      <PlusIcon className="w-5 h-5 shrink-0 text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed" data-i18n={item.aKey}>
                      {t(item.aKey)}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
