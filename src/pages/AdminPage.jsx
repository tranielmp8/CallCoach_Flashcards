import { useMemo, useState } from "react";
import { Brain, LogOut, Pencil, Play } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToasts } from "../composables/useToasts";
import { useCards } from "../composables/useCards";
import { useStudy } from "../composables/useStudy";
import { useQuiz } from "../composables/useQuiz";
import { AppHeader } from "../components/AppHeader";
import { Sidebar } from "../components/Sidebar";
import { EditMode } from "../components/EditMode";
import { PlayMode } from "../components/PlayMode";
import { QuizMode } from "../components/QuizMode";
import { EditModal } from "../components/EditModal";
import { Modal } from "../components/ui/Modal";
import { Toasts } from "../components/ui/Toasts";
import { deepTeal } from "../constants/theme";

const ADMIN_MODES = [
  { key: "edit", label: "Edit", icon: Pencil },
  { key: "play", label: "Play", icon: Play },
  { key: "quiz", label: "Quiz", icon: Brain },
];

export function AdminPage() {
  const { signOut, user } = useAuth();
  const [mode, setMode] = useState("edit");
  const [search, setSearch] = useState("");
  const [imageModal, setImageModal] = useState("");

  const { toasts, addToast, removeToast } = useToasts();

  const {
    cards,
    loading,
    draft,
    setDraft,
    editingId,
    editOpen,
    setEditOpen,
    openCreate,
    openEdit,
    saveCard,
    deleteCard,
  } = useCards(addToast);

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
    addCardToOrder,
    removeCardFromOrder: removeStudyCard,
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
    removeCardFromOrder: removeQuizCard,
  } = useQuiz(cards, addToast);

  const visibleCards = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((c) =>
      [c.question, c.answer, c.apply, c.reflection].some((v) =>
        (v || "").toLowerCase().includes(q)
      )
    );
  }, [cards, search]);

  function handleSaveCard() {
    saveCard((newCard) => addCardToOrder(newCard.id));
  }

  function handleDeleteCard(id) {
    deleteCard(id, (deletedId) => {
      removeStudyCard(deletedId);
      removeQuizCard(deletedId);
    });
  }

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
        {/* Admin bar */}
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <p className="text-xs text-slate-500">
            Signed in as <span className="font-semibold text-slate-700">{user?.email}</span>
          </p>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>

        <AppHeader totalCards={cards.length} accuracy={accuracy} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[290px,1fr]">
          <Sidebar
            modes={ADMIN_MODES}
            activeMode={mode}
            onModeChange={setMode}
            showDeckControls
            search={search}
            setSearch={setSearch}
            onOpenCreate={openCreate}
            onShuffleStudy={shuffleStudy}
            onResetStudy={() => resetStudy(cards)}
            onStartNewQuiz={startNewQuiz}
          />

          <main className="space-y-6">
            {mode === "edit" && (
              <EditMode
                visibleCards={visibleCards}
                onOpenCreate={openCreate}
                onOpenEdit={openEdit}
                onDeleteCard={handleDeleteCard}
                onImageClick={setImageModal}
              />
            )}

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

      <EditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveCard}
        draft={draft}
        setDraft={setDraft}
        isEditing={Boolean(editingId)}
      />

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
