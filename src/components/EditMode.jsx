import { motion } from "framer-motion";
import { BookOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { deepTeal } from "../constants/theme";

export function EditMode({ visibleCards, onOpenCreate, onOpenEdit, onDeleteCard, onImageClick }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Edit mode</h2>
          <p className="mt-1 text-sm text-slate-500">
            Create, update, and organize your study deck.
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          style={{ backgroundColor: deepTeal }}
        >
          <Plus size={16} /> New flashcard
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {visibleCards.map((card) => (
          <motion.div
            key={card.id}
            layout
            className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                  {card.question}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{card.answer}</p>
              </div>
              <div className="flex shrink-0 gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                <button
                  onClick={() => onOpenEdit(card)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                  aria-label="Edit card"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDeleteCard(card.id)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete card"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {card.apply && (
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Apply
                  </p>
                  <p className="mt-1 text-sm text-slate-700 line-clamp-2">{card.apply}</p>
                </div>
              )}
              {card.reflection && (
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Reflection
                  </p>
                  <p className="mt-1 text-sm text-slate-700 line-clamp-2">{card.reflection}</p>
                </div>
              )}
              {card.image && (
                <button
                  onClick={() => onImageClick(card.image)}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:shadow-md"
                >
                  <img src={card.image} alt="Card visual" className="h-40 w-full object-cover" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {!visibleCards.length && (
        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <BookOpen className="mx-auto text-slate-400" size={30} />
          <p className="mt-3 text-lg font-semibold text-slate-800">No cards found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search or add a new flashcard.
          </p>
        </div>
      )}
    </section>
  );
}
