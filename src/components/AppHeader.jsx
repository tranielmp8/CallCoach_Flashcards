import { Sparkles } from "lucide-react";
import { deepTeal, green, red } from "../constants/theme";
import { StatCard } from "./ui/StatCard";

export function AppHeader({ totalCards, accuracy }) {
  return (
    <header
      className="rounded-[32px] border border-white/70 bg-white/88 p-5 shadow-lg shadow-slate-200/70 sm:p-7"
      style={{ backdropFilter: "blur(14px)" }}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
            <Sparkles size={14} style={{ color: deepTeal }} /> Interactive Flashcard Study App
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Called Coach Me Mastery Study Cards
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Build rich flashcards with questions, answers, apply prompts, reflection prompts, and
              optional images. Share a polished published experience with animated study cards and
              instant-feedback quizzes.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[360px]">
          <StatCard
            title="Total cards"
            value={totalCards}
            subtitle="Your active deck size"
            accent={deepTeal}
          />
          <StatCard
            title="Quiz accuracy"
            value={`${accuracy}%`}
            subtitle="Based on current quiz run"
            accent={accuracy >= 70 ? green : red}
          />
        </div>
      </div>
    </header>
  );
}
