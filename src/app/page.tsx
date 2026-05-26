"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageTransition } from "@/components/animations/PageTransition";
import {
  ShieldCheckIcon, Cog6ToothIcon, GiftIcon, StarIcon, BoltIcon,
  DevicePhoneMobileIcon, AcademicCapIcon, SparklesIcon, MapPinIcon,
  UserGroupIcon, WrenchScrewdriverIcon, HeartIcon,
} from "@heroicons/react/24/outline";
import { GalleryCarousel } from "@/components/ui/GalleryCarousel";
import { useI18nReplace } from "@/hooks/useI18nReplace";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/images/laverie-interieur.jpg", alt: "Intérieur de la laverie BELLISSIMA" },
  { src: "/images/laverie-machine.jpg", alt: "Machine à laver professionnelle" },
  { src: "/images/laverie-comptoir.jpg", alt: "Comptoir de réception BELLISSIMA" },
  { src: "/images/laverie-facade.jpg", alt: "Façade BELLISSIMA" },
  { src: "/images/laverie-nocturne.jpg", alt: "BELLISSIMA de nuit" },
];

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span ref={ref} className={className} />;
}

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const dur = 2000;
          const step = Math.ceil(value / (dur / 16));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= value) {
              setDisplay(value + suffix);
              clearInterval(interval);
            } else {
              setDisplay(current + suffix);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold font-serif text-[#D4AF37] mb-1" suppressHydrationWarning>
        {display}
      </div>
    </div>
  );
}

function AnimatedCard3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02,1.02,1.02)`;
    };
    const handleLeave = () => {
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);
  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 2 + 0.5 });
    }
    function anim() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
        ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    anim();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
}

function VisionCard({ icon: Icon, title, desc, titleKey, descKey }: { icon: any; title: string; desc: string; titleKey: string; descKey: string }) {
  return (
    <AnimatedCard3D>
      <Card className="text-center h-full p-6 md:p-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0077B6]/20 to-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
          <Icon className="w-7 h-7 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-serif font-bold mb-3" data-i18n={titleKey}>{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed" data-i18n={descKey}>{desc}</p>
      </Card>
    </AnimatedCard3D>
  );
}

export default function HomePage() {
  useI18nReplace();

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 slideshow-container">
            {galleryImages.map((img, i) => (
              <div key={i} className="slideshow-slide" style={{ animationDelay: `${i * 5}s` }}>
                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/80 to-[#0077B6]/50" />
          <ParticlesCanvas />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="hero-word inline-block px-4 py-1.5 mb-6 text-sm font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20" data-i18n="hero.dakar">✦ à Dakar</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            <span className="hero-word inline-block text-white" data-i18n="hero.laverie">Laverie</span>{' '}
            <span className="hero-word inline-block text-[#0077B6]" data-i18n="hero.premium">Premium</span><br />
            <span className="hero-word inline-block text-white">100%</span>{' '}
            <span className="hero-word inline-block text-[#D4AF37]" data-i18n="hero.digitale">Digitale</span>
          </h1>
          <p className="hero-lead text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6" data-i18n="hero.subtitle">
            <TypewriterText text="Déposez votre linge, nous faisons le reste. Une expérience de lavage connectée, rapide et fiable." delay={1.5} />
          </p>
          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <Link href="/services"><Button variant="gold" size="lg" data-i18n="hero.cta_offres">Voir nos offres</Button></Link>
            <Link href="/paiement"><Button variant="outline" size="lg" data-i18n="hero.cta_paiement">Paiement en ligne</Button></Link>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="relative py-16 md:py-20 bg-[#0a0a0f]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <AnimatedCounter value={5000} suffix="+" label="" />
              <p className="text-sm text-gray-400" data-i18n="counters.clients">5 000+ clients satisfaits</p>
            </div>
            <div className="text-center">
              <AnimatedCounter value={20} suffix="+" label="" />
              <p className="text-sm text-gray-400" data-i18n="counters.machines">20+ machines haut de gamme</p>
            </div>
            <div className="text-center">
              <AnimatedCounter value={98} suffix="%" label="" />
              <p className="text-sm text-gray-400" data-i18n="counters.avis">4.8/5 — Plus de 1 200 avis</p>
            </div>
            <div className="text-center">
              <AnimatedCounter value={5} suffix="" label="" />
              <p className="text-sm text-gray-400" data-i18n="counters.villes">Dakar et environs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-24 md:py-32 bg-[var(--bg-surface)]">
        <ParticlesCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="gold" className="mb-4" data-i18n="vision.badge">Notre vision</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-i18n="vision.title">Réinventer la laverie à Dakar</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedCard>
              <VisionCard
                icon={ShieldCheckIcon}
                title="Confiance" titleKey="vision.confiance_title"
                desc="La transparence est au coeur de notre engagement. Paiement sécurisé, suivi en temps réel et aucun frais caché. Votre linge est entre de bonnes mains." descKey="vision.confiance_desc"
              />
            </AnimatedCard>
            <AnimatedCard>
              <VisionCard
                icon={WrenchScrewdriverIcon}
                title="Excellence" titleKey="vision.excellence_title"
                desc="Nous utilisons des équipements de pointe et des produits de première qualité pour offrir un résultat irréprochable. Chaque vêtement mérite une attention particulière." descKey="vision.excellence_desc"
              />
            </AnimatedCard>
            <AnimatedCard>
              <VisionCard
                icon={HeartIcon}
                title="Communauté" titleKey="vision.communauté_title"
                desc="Nous croyons en une économie locale forte. Bellissima s'associe aux artisans et commerçants dakarois pour créer un réseau de services de confiance." descKey="vision.communauté_desc"
              />
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="gold" className="mb-4" data-i18n="features.badge">Pourquoi nous choisir</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-i18n="features.title">Une laverie intelligente à votre service</h2>
            <p className="text-gray-400 max-w-2xl mx-auto" data-i18n="features.subtitle">Nous combinons technologie de pointe et service premium pour vous offrir la meilleure expérience de lavage à Dakar.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard>
              <AnimatedCard3D>
                <Card className="text-center h-full p-6">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                    <DevicePhoneMobileIcon className="w-6 h-6 text-[#0077B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n="features.cards.0.title">Paiement Mobile</h3>
                  <p className="text-sm text-gray-400 leading-relaxed" data-i18n="features.cards.0.desc">Payez en toute sécurité depuis votre téléphone via Wave, Orange Money, Free Money ou carte bancaire. Plus besoin d&apos;espèces.</p>
                </Card>
              </AnimatedCard3D>
            </AnimatedCard>
            <AnimatedCard>
              <AnimatedCard3D>
                <Card className="text-center h-full p-6">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                    <AcademicCapIcon className="w-6 h-6 text-[#0077B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n="features.cards.1.title">Suivi en Temps Réel</h3>
                  <p className="text-sm text-gray-400 leading-relaxed" data-i18n="features.cards.1.desc">Recevez des notifications à chaque étape : lavage, séchage, pliage. Vous savez exactement quand votre linge est prêt.</p>
                </Card>
              </AnimatedCard3D>
            </AnimatedCard>
            <AnimatedCard>
              <AnimatedCard3D>
                <Card className="text-center h-full p-6">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                    <SparklesIcon className="w-6 h-6 text-[#0077B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n="features.cards.2.title">Qualité Premium</h3>
                  <p className="text-sm text-gray-400 leading-relaxed" data-i18n="features.cards.2.desc">Machines industrielles de pointe, détergents hypoallergéniques et cycles adaptés à chaque type de tissu. Un résultat impeccable à chaque fois.</p>
                </Card>
              </AnimatedCard3D>
            </AnimatedCard>
            <AnimatedCard>
              <AnimatedCard3D>
                <Card className="text-center h-full p-6">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-4">
                    <BoltIcon className="w-6 h-6 text-[#0077B6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" data-i18n="features.cards.3.title">Service Rapide</h3>
                  <p className="text-sm text-gray-400 leading-relaxed" data-i18n="features.cards.3.desc">Lavage express en 45 minutes ou service standard. Notre système optimisé réduit votre temps d&apos;attente au minimum.</p>
                </Card>
              </AnimatedCard3D>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-24 md:py-32 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="gold" className="mb-4" data-i18n="steps.badge">Comment ça marche</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-i18n="steps.title">Trois étapes simples pour un linge impeccable</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedCard>
              <Card className="text-center h-full p-6 md:p-8">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#D4AF37]">1</div>
                <h3 className="text-lg font-semibold mb-2" data-i18n="steps.list.0.title">1. Choisissez votre formule</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="steps.list.0.desc">Sélectionnez le service qui vous convient : lavage simple, lavage-repassage ou nettoyage à sec. Indiquez le poids de votre linge.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard>
              <Card className="text-center h-full p-6 md:p-8">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#D4AF37]">2</div>
                <h3 className="text-lg font-semibold mb-2" data-i18n="steps.list.1.title">2. Déposez votre linge</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="steps.list.1.desc">Apportez votre linge à notre laverie. Nos agents le pèsent, l&apos;étiquettent et le prennent en charge immédiatement.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard>
              <Card className="text-center h-full p-6 md:p-8">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#D4AF37]">3</div>
                <h3 className="text-lg font-semibold mb-2" data-i18n="steps.list.2.title">3. Récupérez-le frais et plié</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="steps.list.2.desc">Recevez une notification quand c&apos;est prêt. Venez récupérer votre linge parfaitement lavé, séché et plié. Simple comme bonjour.</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="gold" className="mb-4" data-i18n="offers.badge">Nos offres</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-i18n="offers.title">Des formules adaptées à tous vos besoins</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedCard>
              <Card className="text-center h-full p-6 md:p-8">
                <h3 className="text-xl font-serif font-bold mb-4" data-i18n="offers.cards.0.title">Lavage Simple</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="offers.cards.0.desc">Lavage, séchage et pliage. Idéal pour le quotidien. À partir de 2 500 FCFA.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard className="md:-mt-4">
              <Card variant="gold-border" className="text-center h-full p-6 md:p-8 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full" data-i18n="offers.new">Nouveau</span>
                <h3 className="text-xl font-serif font-bold mb-4" data-i18n="offers.cards.1.title">Lavage + Repassage</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="offers.cards.1.desc">Lavage, séchage et repassage professionnel. Parfait pour vos chemises et vêtements de travail. À partir de 4 000 FCFA.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard>
              <Card className="text-center h-full p-6 md:p-8">
                <h3 className="text-xl font-serif font-bold mb-4" data-i18n="offers.cards.2.title">Nettoyage à Sec</h3>
                <p className="text-sm text-gray-400 leading-relaxed" data-i18n="offers.cards.2.desc">Traitement délicat pour vos vêtements fragiles et costumes. Résultat impeccable garanti. À partir de 6 000 FCFA.</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 md:py-32 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="gold" className="mb-4" data-i18n="testimonials.badge">Témoignages</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12" data-i18n="testimonials.title">Ce que nos clients disent de nous</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedCard>
              <Card className="h-full p-6 md:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (<StarIcon key={j} className="w-4 h-4 text-[#D4AF37]" />))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 italic" data-i18n="testimonials.list.0.text">"Enfin une laverie fiable à Dakar ! Je peux payer depuis Wave et suivre ma commande en temps réel. Le linge est toujours parfaitement plié. Je recommande vivement."</p>
                <p className="text-sm font-semibold text-[#D4AF37]" data-i18n="testimonials.list.0.author">— Aminata S.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard>
              <Card className="h-full p-6 md:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (<StarIcon key={j} className="w-4 h-4 text-[#D4AF37]" />))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 italic" data-i18n="testimonials.list.1.text">"Le service de lavage-repassage est excellent. Mes chemises n&apos;ont jamais été aussi bien repassées. Et la rapidité est incroyable : 45 minutes montre en main."</p>
                <p className="text-sm font-semibold text-[#D4AF37]" data-i18n="testimonials.list.1.author">— Moussa D.</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard>
              <Card className="h-full p-6 md:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (<StarIcon key={j} className="w-4 h-4 text-[#D4AF37]" />))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 italic" data-i18n="testimonials.list.2.text">"Je suis une cliente fidèle depuis l&apos;ouverture. La qualité du nettoyage à sec est remarquable. Mes robes fragiles sont traitées avec beaucoup de soin. Merci Bellissima !"</p>
                <p className="text-sm font-semibold text-[#D4AF37]" data-i18n="testimonials.list.2.author">— Fatou K.</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryCarousel items={galleryImages} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#0077B6]/5 to-transparent">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-i18n="cta.title">Prêt à simplifier votre lessive ?</h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto" data-i18n="cta.subtitle">Rejoignez des milliers de clients satisfaits à Dakar. Déposez votre linge et profitez de votre temps libre.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services"><Button variant="gold" size="lg" data-i18n="cta.services">Découvrir nos services</Button></Link>
              <Link href="/contact"><Button variant="outline" size="lg" data-i18n="cta.contact">Nous contacter</Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
