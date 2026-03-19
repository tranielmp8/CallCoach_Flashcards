import { deepTeal } from "../constants/theme";
import { progressPercent } from "../utils/cardUtils";
import { Flashcard3D } from "./Flashcard3D";
import { Progress } from "./ui/Progress";

export function PlayMode({
  orderedStudyCards,
  currentStudyCard,
  activeIndex,
  flipped,
  setFlipped,
  onNext,
  onPrev,
  onShuffle,
  onReset,
  onImageClick,
}) {
  const playProgress = progressPercent(
    Math.min(activeIndex + 1, orderedStudyCards.length),
    orderedStudyCards.length || 1
  );

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Play mode</h2>
          <p className="mt-1 text-sm text-slate-500">
            Flip cards in 3D, review concepts, and move through the deck at your pace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onShuffle}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Shuffle
          </button>
          <button
            onClick={onReset}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <Progress
          value={playProgress}
          label={`Card ${Math.min(activeIndex + 1, Math.max(orderedStudyCards.length, 1))} of ${orderedStudyCards.length || 0}`}
        />
        {currentStudyCard ? (
          <Flashcard3D
            card={currentStudyCard}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
            onImageClick={onImageClick}
          />
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
            No flashcards available yet.
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={onPrev}
            disabled={activeIndex === 0}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setFlipped((f) => !f)}
            disabled={!currentStudyCard}
            className="rounded-2xl px-4 py-3 text-sm font-semibold text-white transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: deepTeal }}
          >
            {flipped ? "Show question" : "Reveal answer"}
          </button>
          <button
            onClick={onNext}
            disabled={activeIndex >= orderedStudyCards.length - 1 || !currentStudyCard}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
