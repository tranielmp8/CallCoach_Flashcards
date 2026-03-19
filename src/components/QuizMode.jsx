import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { deepTeal, green, red } from "../constants/theme";
import { cls } from "../utils/cardUtils";
import { Progress } from "./ui/Progress";
import { StatCard } from "./ui/StatCard";

export function QuizMode({
  quizCards,
  currentQuizCard,
  currentChoices,
  quizIndex,
  selectedChoice,
  revealed,
  score,
  answeredIds,
  quizComplete,
  accuracy,
  quizProgress,
  onAnswer,
  onNext,
  onStartNew,
}) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Quiz mode</h2>
          <p className="mt-1 text-sm text-slate-500">
            Test yourself with multiple-choice prompts, instant feedback, and score tracking.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-auto">
          <StatCard
            title="Score"
            value={`${score}`}
            subtitle={`Answered ${answeredIds.length}`}
            accent={score > 0 ? green : deepTeal}
          />
          <StatCard
            title="Accuracy"
            value={`${accuracy}%`}
            subtitle="Current run"
            accent={accuracy >= 70 ? green : red}
          />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <Progress
          value={quizProgress}
          label={`Progress ${Math.min(quizIndex + 1, Math.max(quizCards.length, 1))} of ${quizCards.length || 0}`}
        />

        {currentQuizCard ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="rounded-3xl bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Question
              </p>
              <h3 className="mt-2 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                {currentQuizCard.question}
              </h3>
            </div>

            <div className="mt-5 grid gap-3">
              {currentChoices.map((choice, idx) => {
                const isCorrect = choice === currentQuizCard.answer;
                const isSelected = selectedChoice === choice;
                const showCorrect = revealed && isCorrect;
                const showWrong = revealed && isSelected && !isCorrect;
                return (
                  <button
                    key={`${choice}-${idx}`}
                    onClick={() => onAnswer(choice)}
                    disabled={revealed}
                    className={cls(
                      "flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-medium transition sm:text-base",
                      !revealed && "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md",
                      showCorrect && "border-green-200 bg-green-50",
                      showWrong && "border-red-200 bg-red-50",
                      revealed && !showCorrect && !showWrong && "border-slate-200 bg-slate-50 text-slate-500"
                    )}
                  >
                    <span>{choice}</span>
                    {showCorrect ? <CheckCircle2 size={18} style={{ color: green }} /> : null}
                    {showWrong ? <XCircle size={18} style={{ color: red }} /> : null}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-5 rounded-3xl border p-4 sm:p-5"
                  style={{
                    borderColor:
                      selectedChoice === currentQuizCard.answer ? "#bbf7d0" : "#fecaca",
                    backgroundColor:
                      selectedChoice === currentQuizCard.answer ? "#f0fdf4" : "#fef2f2",
                  }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: selectedChoice === currentQuizCard.answer ? green : red,
                    }}
                  >
                    {selectedChoice === currentQuizCard.answer
                      ? "Correct answer"
                      : "Correct answer revealed"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{currentQuizCard.answer}</p>
                  {(currentQuizCard.apply || currentQuizCard.reflection) && (
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {currentQuizCard.apply && (
                        <div className="rounded-2xl bg-white/80 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Apply
                          </p>
                          <p className="mt-1 text-sm text-slate-700">{currentQuizCard.apply}</p>
                        </div>
                      )}
                      {currentQuizCard.reflection && (
                        <div className="rounded-2xl bg-white/80 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Reflection
                          </p>
                          <p className="mt-1 text-sm text-slate-700">
                            {currentQuizCard.reflection}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={onStartNew}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Restart quiz
              </button>
              <button
                onClick={onNext}
                disabled={!revealed || quizIndex >= quizCards.length - 1}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-white transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: deepTeal }}
              >
                Next question
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
            No flashcards available for quiz mode.
          </div>
        )}

        {quizComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Quiz complete
            </p>
            <h3 className="mt-2 text-3xl font-bold text-slate-950">
              {score} / {quizCards.length}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              You finished the quiz with {accuracy}% accuracy.
            </p>
            <button
              onClick={onStartNew}
              className="mt-5 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              style={{ backgroundColor: deepTeal }}
            >
              Try again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
