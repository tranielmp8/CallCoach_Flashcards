import { deepTeal } from "../constants/theme";

export function Flashcard3D({ card, flipped, onFlip, onImageClick }) {
  return (
    <div className="mx-auto w-full max-w-3xl" style={{ perspective: "1600px" }}>
      <button
        onClick={onFlip}
        className="group relative block h-[420px] w-full text-left sm:h-[460px]"
        aria-label="Flip flashcard"
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl sm:p-7"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Question
                </span>
                <span className="text-sm font-medium text-slate-400 transition group-hover:text-slate-600">
                  Tap to flip
                </span>
              </div>
              <div className="mt-5 flex-1 overflow-auto">
                <h3 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                  {card.question}
                </h3>
                {card.image ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick(card.image);
                    }}
                    className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <img
                      src={card.image}
                      alt="Flashcard visual"
                      className="h-48 w-full object-cover sm:h-56"
                    />
                  </button>
                ) : null}
                <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 sm:p-5">
                  Read the prompt, then flip the card to reveal the answer, apply, and reflection
                  prompts.
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl sm:p-7"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: deepTeal }}
                >
                  Answer
                </span>
                <span className="text-sm font-medium text-slate-400">Tap to flip back</span>
              </div>
              <div className="mt-5 flex-1 overflow-auto space-y-4">
                <section className="rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Answer
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-800 sm:text-lg">
                    {card.answer}
                  </p>
                </section>
                <section className="rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Apply
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                    {card.apply || "No apply prompt added."}
                  </p>
                </section>
                <section className="rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Reflection
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                    {card.reflection || "No reflection prompt added."}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
