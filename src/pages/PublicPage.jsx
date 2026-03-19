import { useState } from "react";
import { Brain, Play } from "lucide-react";
import { useToasts } from "../composables/useToasts";
import { useCards } from "../composables/useCards";
import { useStudy } from "../composables/useStudy";
import { useQuiz } from "../composables/useQuiz";
import { AppHeader } from "../components/AppHeader";
import { Sidebar } from "../components/Sidebar";
import { PlayMode } from "../components/PlayMode";
import { QuizMode } from "../components/QuizMode";
import { Modal } from "../components/ui/Modal";
import { Toasts } from "../components/ui/Toasts";

const PUBLIC_MODES = [
  { key: "play", label: "Play", icon: Play },
  { key: "quiz", label: "Quiz", icon: Brain },
];

export function PublicPage() {
  const [mode, setMode] = useState("play");
  const [imageModal, setImageModal] = useState("");

  const { toasts, addToast, removeToast } = useToasts();

  const { cards, loading } = useCards(addToast);

  const {
    orderedStudyCards,
    currentStudyCard,
    activeIndex,
    flipped,
    setFlipped,
    resetStudy,
    shuffleStudy,
    nextStudy,
    prevStudy,
  } = useStudy(cards, addToast);

  const {
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
    startNewQuiz,
    answerQuiz,
    nextQuiz,
  } = useQuiz(cards, addToast);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading cards…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toasts toasts={toasts} removeToast={removeToast} />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <AppHeader totalCards={cards.length} accuracy={accuracy} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[290px,1fr]">
          <Sidebar
            modes={PUBLIC_MODES}
            activeMode={mode}
            onModeChange={setMode}
            showDeckControls={false}
            onShuffleStudy={shuffleStudy}
            onResetStudy={() => resetStudy(cards)}
            onStartNewQuiz={startNewQuiz}
          />

          <main className="space-y-6">
            {mode === "play" && (
              <PlayMode
                orderedStudyCards={orderedStudyCards}
                currentStudyCard={currentStudyCard}
                activeIndex={activeIndex}
                flipped={flipped}
                setFlipped={setFlipped}
                onNext={nextStudy}
                onPrev={prevStudy}
                onShuffle={shuffleStudy}
                onReset={() => resetStudy(cards)}
                onImageClick={setImageModal}
              />
            )}

            {mode === "quiz" && (
              <QuizMode
                quizCards={quizCards}
                currentQuizCard={currentQuizCard}
                currentChoices={currentChoices}
                quizIndex={quizIndex}
                selectedChoice={selectedChoice}
                revealed={revealed}
                score={score}
                answeredIds={answeredIds}
                quizComplete={quizComplete}
                accuracy={accuracy}
                quizProgress={quizProgress}
                onAnswer={answerQuiz}
                onNext={nextQuiz}
                onStartNew={startNewQuiz}
              />
            )}
          </main>
        </div>
      </div>

      <Modal open={Boolean(imageModal)} onClose={() => setImageModal("")} title="Image preview" wide>
        {imageModal && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img src={imageModal} alt="Preview" className="max-h-[75vh] w-full object-contain" />
          </div>
        )}
      </Modal>
    </div>
  );
}
