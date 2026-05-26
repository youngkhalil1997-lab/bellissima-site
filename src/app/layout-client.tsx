"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/lib/i18n";

type Theme = "dark" | "light";

export function ClientShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("bellissima-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const t = prefersDark ? "dark" : "light";
      setTheme(t);
      document.documentElement.classList.add(t);
    }
  }, []);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    localStorage.setItem("bellissima-theme", next);
  };

  return (
    <I18nProvider>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </I18nProvider>
  );
}
