import { Brain, RotateCcw, Shuffle } from "lucide-react";
import { Input } from "./ui/Input";
import { SegmentButton } from "./ui/SegmentButton";
import { deepTeal } from "../constants/theme";

export function Sidebar({
  modes,
  activeMode,
  onModeChange,
  showDeckControls = false,
  search,
  setSearch,
  onOpenCreate,
  onShuffleStudy,
  onResetStudy,
  onStartNewQuiz,
}) {
  return (
    <aside className="space-y-6">
      {/* Mode selector */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-semibold text-slate-900">Modes</p>
        <div className="mt-4 grid gap-2">
          {modes.map((item) => (
            <SegmentButton
              key={item.key}
              active={activeMode === item.key}
              onClick={() => onModeChange(item.key)}
              icon={item.icon}
            >
              {item.label}
            </SegmentButton>
          ))}
        </div>
      </section>

      {/* Deck controls — admin only */}
      {showDeckControls && (
        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-semibold text-slate-900">Deck controls</p>
          <p className="mt-1 text-sm text-slate-500">Search, add, and manage flashcards.</p>
          <div className="mt-4 space-y-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards..."
            />
            <button
              onClick={onOpenCreate}
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              style={{ backgroundColor: deepTeal }}
            >
              + Add flashcard
            </button>
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-semibold text-slate-900">Quick actions</p>
        <div className="mt-4 grid gap-2">
          <button
            onClick={onShuffleStudy}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Shuffle size={16} /> Shuffle cards
          </button>
          <button
            onClick={onResetStudy}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={16} /> Reset play order
          </button>
          <button
            onClick={onStartNewQuiz}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Brain size={16} /> Restart quiz
          </button>
        </div>
      </section>
    </aside>
  );
}
