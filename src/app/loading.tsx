export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--text-muted)]">Chargement...</p>
      </div>
    </div>
  );
}
