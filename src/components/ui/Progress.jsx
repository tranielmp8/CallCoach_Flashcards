import { motion } from "framer-motion";
import { deepTeal } from "../../constants/theme";

export function Progress({ value, label }) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: deepTeal }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </div>
  );
}
