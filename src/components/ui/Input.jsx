import { cls } from "../../utils/cardUtils";

export function Input(props) {
  return (
    <input
      {...props}
      className={cls(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition",
        "placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100",
        props.className
      )}
    />
  );
}
