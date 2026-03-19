import { useEffect, useMemo, useState } from "react";
import { shuffleArray, getChoices, progressPercent } from "../utils/cardUtils";

export function useQuiz(cards, addToast) {
  const [quizOrder, setQuizOrder] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredIds, setAnsweredIds] = useState([]);

  const quizCards = useMemo(() => {
    const source = quizOrder.length
      ? quizOrder.map((id) => cards.find((c) => c.id === id)).filter(Boolean)
      : cards;
    return source;
  }, [cards, quizOrder]);

  const currentQuizCard = quizCards[quizIndex] || null;
  const currentChoices = useMemo(
    () => (currentQuizCard ? getChoices(cards, currentQuizCard) : []),
    [cards, currentQuizCard]
  );

  const quizComplete = quizCards.length > 0 && answeredIds.length >= quizCards.length && revealed;
  const accuracy = answeredIds.length ? Math.round((score / answeredIds.length) * 100) : 0;
  const quizProgress = progressPercent(
    Math.min(quizIndex + (revealed ? 1 : 0), quizCards.length),
    quizCards.length || 1
  );

  // Seed order once cards first load from Supabase
  useEffect(() => {
    if (cards.length > 0 && quizOrder.length === 0) {
      setQuizOrder(shuffleArray(cards.map((c) => c.id)));
    }
  }, [cards, quizOrder.length]);

  function resetQuiz(nextCards = cards) {
    setQuizOrder(shuffleArray(nextCards.map((c) => c.id)));
    setQuizIndex(0);
    setSelectedChoice("");
    setRevealed(false);
    setScore(0);
    setAnsweredIds([]);
  }

  function startNewQuiz() {
    resetQuiz(cards);
    addToast("New quiz started", "Your score has been reset.", "info");
  }

  function answerQuiz(choice) {
    if (!currentQuizCard || revealed) return;
    setSelectedChoice(choice);
    setRevealed(true);
    setAnsweredIds((prev) => [...prev, currentQuizCard.id]);
    if (choice === currentQuizCard.answer) {
      setScore((s) => s + 1);
      addToast("Correct", "Nice work — you chose the right answer.", "success");
    } else {
      addToast("Not quite", "Review the correct answer and keep going.", "error");
    }
  }

  function nextQuiz() {
    if (quizIndex >= quizCards.length - 1) return;
    setQuizIndex((i) => i + 1);
    setSelectedChoice("");
    setRevealed(false);
  }

  function removeCardFromOrder(id) {
    setQuizOrder((prev) => prev.filter((cardId) => cardId !== id));
  }

  useEffect(() => {
    if (quizIndex >= quizCards.length) {
      setQuizIndex(Math.max(0, quizCards.length - 1));
    }
  }, [quizCards.length, quizIndex]);

  return {
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
    resetQuiz,
    startNewQuiz,
    answerQuiz,
    nextQuiz,
    removeCardFromOrder,
  };
}
