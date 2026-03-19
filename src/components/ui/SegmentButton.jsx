import { deepTeal } from "../../constants/theme";
import { cls } from "../../utils/cardUtils";

export function SegmentButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200",
        active
          ? "text-white shadow-lg shadow-slate-300/50"
          : "bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-slate-50"
      )}
      style={active ? { backgroundColor: deepTeal } : undefined}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}
