"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CreditCardIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useI18n } from "@/lib/i18n";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, locales } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const currentLang = locales.find((l) => l.code === locale) || locales[0];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/admin/logo-BELLISSIMA-light.svg"
              alt="BELLISSIMA"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.accueil"
            >
              Accueil
            </Link>
            <Link
              href="/services"
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/services" || pathname.startsWith("/services")
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.services"
            >
              Services
            </Link>
            <Link
              href="/fidelite"
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/fidelite" || pathname.startsWith("/fidelite")
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.fidelite"
            >
              Fidélité
            </Link>
            <Link
              href="/contact"
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/contact" || pathname.startsWith("/contact")
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.contact"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/faq" || pathname.startsWith("/faq")
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.faq"
            >
              FAQ
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative hidden md:block group">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Langue"
                title={`${currentLang.flag} ${currentLang.label}`}
              >
                {currentLang.flag}
              </button>
              <div className="absolute right-0 top-full mt-2 w-36 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                {locales.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                      lang.code === locale
                        ? "text-[#0077B6] bg-[#0077B6]/5"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
                    )}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.code.toUpperCase()}</span>
                    <span className="text-xs text-[var(--text-dim)] truncate">{lang.label}</span>
                    {lang.code === locale && <span className="ml-auto text-[#0077B6]">✓</span>}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <Link
              href={{ pathname: "/paiement" }}
              className={cn(
                "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-[#0077B6] text-white hover:bg-[#0099E6]",
                "transition-all duration-200 shadow-lg shadow-[#0077B6]/20",
                "active:scale-95"
              )}
              data-i18n="nav.paiement"
            >
              <CreditCardIcon className="w-4 h-4" />
              Paiement
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 md:hidden transition-all duration-300 z-40",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={cn(
            "relative bg-[var(--bg-primary)] border-b border-[var(--border-color)]",
            "transition-all duration-300",
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <div className="px-4 py-4 space-y-1">
            {/* Langue mobile */}
            <div className="px-4 py-3">
              <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider mb-3" data-i18n="common.language">Langue</p>
              <div className="flex flex-wrap gap-2">
                {locales.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setMobileOpen(false); }}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-medium border transition-all",
                      lang.code === locale
                        ? "bg-[#0077B6]/10 text-[#0077B6] border-[#0077B6]/30"
                        : "text-[var(--text-muted)] border-[var(--border-color)] hover:border-[#0077B6]/30"
                    )}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                pathname === "/"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.accueil"
            >
              Accueil
            </Link>
            <Link
              href="/services"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                pathname === "/services"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.services"
            >
              Services
            </Link>
            <Link
              href="/fidelite"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                pathname === "/fidelite"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.fidelite"
            >
              Fidélité
            </Link>
            <Link
              href="/contact"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                pathname === "/contact"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.contact"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                pathname === "/faq"
                  ? "text-[var(--text-primary)] bg-[var(--bg-card)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
              data-i18n="nav.faq"
            >
              FAQ
            </Link>
            <Link
              href={{ pathname: "/paiement" }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold bg-[#0077B6] text-white"
              data-i18n="nav.paiement"
            >
              <CreditCardIcon className="w-4 h-4" />
              Paiement
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
