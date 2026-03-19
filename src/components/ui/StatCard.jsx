export function StatCard({ title, value, subtitle, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{value}</p>
        {accent ? (
          <span className="mb-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        ) : null}
      </div>
      {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
