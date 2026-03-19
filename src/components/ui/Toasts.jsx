import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { deepTeal, green, red } from "../../constants/theme";

export function Toasts({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex w-[min(92vw,380px)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    toast.type === "success" ? green : toast.type === "error" ? red : deepTeal,
                }}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{toast.title}</p>
                {toast.message ? (
                  <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
                ) : null}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
