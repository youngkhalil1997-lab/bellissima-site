"use client";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-serif font-bold mb-3">Une erreur est survenue</h1>
        <p className="text-[var(--text-muted)] mb-8">
          Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0077B6] text-white font-semibold hover:bg-[#0099E6] transition-all active:scale-95"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] font-semibold hover:text-[var(--text-primary)] hover:border-[var(--text-dim)] transition-all"
          >
            <HomeIcon className="w-4 h-4" />
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
