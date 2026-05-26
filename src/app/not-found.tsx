"use client";
import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-serif font-bold text-[#0077B6]/20 mb-4">404</div>
        <h1 className="text-3xl font-serif font-bold mb-3">Page introuvable</h1>
        <p className="text-[var(--text-muted)] mb-8">
          Désolé, cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0077B6] text-white font-semibold hover:bg-[#0099E6] transition-all active:scale-95"
          >
            <HomeIcon className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] font-semibold hover:text-[var(--text-primary)] hover:border-[var(--text-dim)] transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
}
