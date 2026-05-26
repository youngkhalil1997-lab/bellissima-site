"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { CreditCardIcon, Cog6ToothIcon, CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useI18nReplace } from "@/hooks/useI18nReplace";

type PaymentMethod = "wave" | "orange" | "yas" | "card" | "cash";
type StepType = "machine" | "payment" | "confirm";

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  logo: string;
  color: string;
  bgColor: string;
  description: string;
}

const stepKeys: StepType[] = ["machine", "payment", "confirm"];

const stepLabelsMap: Record<StepType, string> = {
  machine: "Machine",
  payment: "Paiement",
  confirm: "Confirmation",
};

const machines = [
  { name: "Petite Machine", nameKey: "paiement.machines.0.name", price: "2 500", priceKey: "paiement.machines.0.price", kgKey: "paiement.machines.0.kg", timeKey: "paiement.machines.0.time" },
  { name: "Machine Standard", nameKey: "paiement.machines.1.name", price: "3 000", priceKey: "paiement.machines.1.price", kgKey: "paiement.machines.1.kg", timeKey: "paiement.machines.1.time" },
  { name: "Grande Machine", nameKey: "paiement.machines.2.name", price: "3 500", priceKey: "paiement.machines.2.price", kgKey: "paiement.machines.2.kg", timeKey: "paiement.machines.2.time" },
];

function PaiementContent() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<StepType>("machine");
  const [selectedMachine, setSelectedMachine] = useState<number | null>(null);
  const searchParams = useSearchParams();
  useI18nReplace();

  const paymentOptions: PaymentOption[] = [
    { id: "wave", name: "Wave", logo: "/admin/logo-wave.png", color: "#0077B6", bgColor: "bg-[#0077B6]/10", description: "Paiement mobile Wave" },
    { id: "orange", name: "Orange Money", logo: "/admin/logo-orange-money.png", color: "#FF7900", bgColor: "bg-[#FF7900]/10", description: "Paiement Orange Money" },
    { id: "yas", name: "Yas", logo: "/admin/yas.png", color: "#D4AF37", bgColor: "bg-[#D4AF37]/10", description: "Paiement Yas" },
    { id: "card", name: "Carte bancaire", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAAC55sFkAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAQdSURBVGiB7ZhLbFNXEIa/64cTEwI0tMkvhUWEUBep0EV3XVAW7YJuqMKmUtVNBRSVVYHQokqF1C2wqLpApS0SK1apEMQOMQ4BkoCJsf34Xnadxcm9fsTOw0pKp3NLz505c+b8Z+YyQnh4eHh4eHh4/NcoFAo0bjY5Pj5Od3c3v/76K4uLixQKBXK5HPPz8+TzeXK5HLlcjkwmQzabpVQqEQTB9t6GohAHDx4kFotRKpU4f/48w8PDlEolVFWMjo6Sz+cZGBhgcXGRNWsSnDlzhmw2y8jICIVCgVarRavVol6vEwQBjUaDZrNJGIaEYUiz2aTZbK5Y4/Pz8/z000+cOHGCDz74gG63a+/T6TS3b9/m6dOnTE5OsnXrVm7fvs2tW7c4c+YMP//8M9VqlU6ng++H+L6PpiliGDSbTZrNJq1Wi2aziWFoPib6/X6azSZhGP4p6H6/T7/fJ45jJEkiSZKYnZ1l48aN5PN52u02165dY3R0lPPnz3P48GEKhQJxHHPhwgW2bdvG2bNnee+999i4cSOZTIYwDAl8j8j30KqVaDabcRzTbDaJ45h6vU4jbnL0y0NMTk7axTebTZrNJnEcoxQhSRJCCBqNBlIUt9ttarUas7OzCCHYu3cvL168IJ/Pc/LkSW7evMnS0hJ79+7l4MGDnDt3jtnZWXbs2EGj0UD4PkH+BZVCUUyj0aDRaBCGIa1Wi1arRRAEKKWM9+P4byFmjKKUEkmSaDabVCoVcrkcn3/+Oblcjpnfr/KglmXmeo3FxUWWl5exbZvBwUFUq8Xg4CArKyuYpsn4+DiJwSFmsxnK5TJBEBAFdQzDII5j5ufnsW2bKIpw75WrGJZl4fs+vu+vbR7btqlWqywuLjIyMgJBwOHDh5FSMjs7y2effUa5XMZxHAzD4Pbt22zcuJEoihBCMBaNsC2zEb2xiCdXcBwX3/exbRvXlTQaDXRdx7ZtXNdFVbVWkSRJkCQJQRAQhiGqVkU+Hy5Z9/0+cRwTRRGGYaCqms3btgWhbNhM3AAAIABJREFUKJF9Bz3XxXE9LMvCcz0C30OwBstaxf7ntjAMg6IodF0njmM83yeKIlzXxbIsPM9LB7CubZCiYRgYhvGBaZqEYYiS6t9p/V3aX1JKgiAgiiKUUjSbTYIgWNs2bm/Yts0wDMIwpNPp4DgOrusSRRGqqtYKYRhYloVt2+RyOZIkwbZtkiTZ0zYEQYAQgsnJScrlMq1WC9M00XWdpaUlbNtenwYIwxDTNKnVahSLRaSU+L5Pp9NBlTW9IAhwpSQIAhzHwXVdXGnS6/VotVo0Gg2azSZxHBOGIVLK+Omz//pVAMMwiKKIYrFILpdDCEGj0UBVh0wmYxsGvQtBENBqtWg0GsRxjOM4JElCp9MhSRJs26bX69Hv94njGNu2kVI+fyMlHh4eHh4eHv8G/wF/pVIN7/02PAAAAABJRU5ErkJggg==", color: "#22c55e", bgColor: "bg-green-500/10", description: "Paiement au kiosque" },
  ];

  const stepLabels: Record<StepType, string> = {
    machine: stepLabelsMap.machine,
    payment: stepLabelsMap.payment,
    confirm: stepLabelsMap.confirm,
  };

  useEffect(() => {
    const machineParam = searchParams.get("machine");
    if (machineParam !== null) {
      const idx = parseInt(machineParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < 3) {
        setSelectedMachine(idx);
        setStep("payment");
      }
    }
  }, [searchParams]);

  const handleMachineSelect = (idx: number) => {
    setSelectedMachine(idx);
    setStep("payment");
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("confirm");
  };

  const handleConfirm = () => {
    alert("Merci pour votre paiement ! Vous recevrez une confirmation par SMS.");
  };

  return (
    <PageTransition>
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0077B6]/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Badge variant="gold" className="mb-4" data-i18n="paiement.badge">Paiement</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-i18n="paiement.title">
              Réservez et payez en ligne
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto" data-i18n="paiement.subtitle">
              Choisissez votre machine et votre mode de paiement en toute simplicité.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {stepKeys.map((s, i) => {
              const isActive = step === s;
              const isDone =
                (step === "payment" && s === "machine") ||
                (step === "confirm" && (s === "machine" || s === "payment"));
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone || isActive
                        ? "bg-[#0077B6] text-white"
                        : "bg-[#0077B6]/20 text-gray-400"
                    }`}
                  >
                    {isDone ? <CheckIcon className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm capitalize hidden sm:block ${
                      isActive ? "text-white font-semibold" : "text-gray-500"
                    }`}
                    data-i18n={"paiement.steps." + s}
                  >
                    {stepLabels[s]}
                  </span>
                  {i < 2 && <div className="w-8 h-0.5 bg-white/10" />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Machine selection */}
          {step === "machine" && (
            <AnimatedSection key="machine">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {machines.map((m, idx) => (
                  <AnimatedCard key={idx}>
                    <Card
                      className={`text-center cursor-pointer transition-all h-full ${
                        selectedMachine === idx
                          ? "border-[#0077B6] ring-2 ring-[#0077B6]/30"
                          : ""
                      }`}
                      onClick={() => handleMachineSelect(idx)}
                      hover
                    >
                      <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                        <Cog6ToothIcon className="w-6 h-6 text-[#0077B6]" />
                      </div>
                      <h3 className="text-lg font-semibold mb-1" data-i18n={m.nameKey}>{m.name}</h3>
                      <p className="text-2xl font-bold text-[#D4AF37] mb-2" data-i18n={m.priceKey}>{m.price}</p>
                      <div className="flex justify-center gap-4 text-xs text-gray-400">
                        <span data-i18n={m.kgKey}>7 kg</span>
                        <span>•</span>
                        <span data-i18n={m.timeKey}>45 min</span>
                      </div>
                      <div className="mt-4">
                        <Button variant="primary" size="sm" className="w-full justify-center" data-i18n="paiement.choose">
                          Choisir
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </Card>
                  </AnimatedCard>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Step 2 */}
          {step === "payment" && (
            <AnimatedSection key="payment">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8" data-i18n="paiement.payment.choose_method">Choisissez votre moyen de paiement</h2>
                <div className="grid gap-4">
                  {paymentOptions.map((option) => (
                    <div key={option.id}>
                      <Card
                        className={`cursor-pointer transition-all ${
                          selectedMethod === option.id
                            ? "border-2"
                            : ""
                        }`}
                        style={{
                          borderColor: selectedMethod === option.id ? option.color : undefined,
                        }}
                        onClick={() => handlePaymentSelect(option.id)}
                        hover
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl ${option.bgColor} flex items-center justify-center overflow-hidden`}
                          >
                            {option.logo ? (
                              <img
                                src={option.logo}
                                alt={option.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <CreditCardIcon className="w-6 h-6" style={{ color: option.color }} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{option.name}</h3>
                            <p className="text-sm text-gray-400">{option.description}</p>
                          </div>
                          {selectedMethod === option.id && (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: option.color }}
                            >
                              <CheckIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3 */}
          {step === "confirm" && selectedMachine !== null && selectedMethod !== null && (
            <AnimatedSection key="confirm">
              <div className="max-w-md mx-auto">
                <Card className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold mb-2" data-i18n="paiement.confirm.title">Confirmer votre réservation</h2>
                  <div className="space-y-3 text-sm text-gray-400 mb-6">
                    <p>
                      <span data-i18n="paiement.confirm.machine_label">Machine</span> :{' '}
                      <span className="text-white font-semibold" data-i18n={machines[selectedMachine].nameKey}>
                        {machines[selectedMachine].name}
                      </span>
                    </p>
                    <p>
                      <span data-i18n="paiement.confirm.price_label">Prix</span> :{' '}
                      <span className="text-[#D4AF37] font-bold" data-i18n={machines[selectedMachine].priceKey}>
                        {machines[selectedMachine].price}
                      </span>
                    </p>
                    <p>
                      <span data-i18n="paiement.confirm.method_label">Paiement</span> :{' '}
                      <span className="text-white font-semibold">
                        {paymentOptions.find((p) => p.id === selectedMethod)?.name}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full justify-center"
                    onClick={handleConfirm}
                    data-i18n="paiement.confirm.submit"
                  >
                    Confirmer et payer
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                  <button
                    onClick={() => setStep("payment")}
                    className="mt-3 text-sm text-gray-400 hover:text-white transition-colors"
                    data-i18n="paiement.confirm.modify"
                  >
                    Modifier le moyen de paiement
                  </button>
                </Card>
              </div>
            </AnimatedSection>
          )}

          {step !== "machine" && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  if (step === "confirm") setStep("payment");
                  else if (step === "payment") setStep("machine");
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                data-i18n="paiement.back.retour"
              >
                ← Retour
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default function PaiementPage() {
  return (
    <Suspense>
      <PaiementContent />
    </Suspense>
  );
}
