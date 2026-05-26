"use client";

import Link from "next/link";
import { ClockIcon, WifiIcon, PhoneIcon, MapPinIcon, EnvelopeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useI18nReplace } from "@/hooks/useI18nReplace";

const footerLinks = [
  { href: "/", label: "Accueil", key: "nav.accueil" },
  { href: "/services", label: "Services", key: "nav.services" },
  { href: "/fidelite", label: "Fidélité", key: "nav.fidelite" },
  { href: "/contact", label: "Contact", key: "nav.contact" },
  { href: "/faq", label: "FAQ", key: "nav.faq" },
  { href: "/paiement", label: "Paiement", key: "nav.paiement" },
];

const contactInfo = [
  { icon: MapPinIcon, text: "Dakar, Sénégal", key: "footer.contact.address" },
  { icon: ClockIcon, text: "Lun — Dim : 07h00 – 23h00", key: "footer.contact.hours" },
  { icon: PhoneIcon, text: "+221 77 000 00 01", key: "footer.contact.phone", href: "https://wa.me/221770000001" },
  { icon: EnvelopeIcon, text: "contact@bellissima.sn", key: "footer.contact.email", href: "mailto:contact@bellissima.sn" },
];

const services = [
  { text: "Lavage premium 1h–1h30", key: "footer.services.0" },
  { text: "Séchage professionnel", key: "footer.services.1" },
  { text: "Repassage sur place", key: "footer.services.2" },
  { text: "Livraison à domicile", key: "footer.services.3" },
  { text: "Abonnement pro", key: "footer.services.4" },
];

export function Footer() {
  useI18nReplace();

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-color)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex">
              <img
                src="/admin/logo-BELLISSIMA-light.svg"
                alt="BELLISSIMA"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed" data-i18n="footer.brand.desc">
              Laverie premium 100% digitale à Dakar. Lavage et séchage professionnels en 1h–1h30, 100% digital, simple et sécurisé.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-dim)]" data-i18n="footer.brand.wifi">
              <WifiIcon className="w-3.5 h-3.5" />
              WiFi gratuit sur place
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider" data-i18n="footer.nav.title">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[#0077B6] transition-colors duration-200"
                    data-i18n={link.key}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider" data-i18n="footer.services.title">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.key} className="text-sm text-[var(--text-muted)]" data-i18n={service.key}>
                  {service.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider" data-i18n="footer.contact.title">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.key}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm text-[var(--text-muted)] hover:text-[#0077B6] transition-colors"
                    >
                      <item.icon className="w-4 h-4 mt-0.5 shrink-0 text-[#0077B6]" />
                      <span data-i18n={item.key}>{item.text}</span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <item.icon className="w-4 h-4 mt-0.5 shrink-0 text-[#0077B6]" />
                      <span data-i18n={item.key}>{item.text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-dim)]">
            &copy; {new Date().getFullYear()} BELLISSIMA Smart Laundry — Dakar, Sénégal
          </p>
          <p className="text-xs text-[var(--text-dim)]" data-i18n="footer.bottom.tagline">
            Confort · Propreté · Modernité
          </p>
        </div>
      </div>
    </footer>
  );
}
