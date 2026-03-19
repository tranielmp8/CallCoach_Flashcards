import { useEffect, useMemo, useState } from "react";
import { shuffleArray } from "../utils/cardUtils";

export function useStudy(cards, addToast) {
  const [studyOrder, setStudyOrder] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const orderedStudyCards = useMemo(() => {
    const map = new Map(cards.map((c) => [c.id, c]));
    return studyOrder.map((id) => map.get(id)).filter(Boolean);
  }, [cards, studyOrder]);

  const currentStudyCard = orderedStudyCards[activeIndex] || null;

  // Seed order once cards first load from Supabase
  useEffect(() => {
    if (cards.length > 0 && studyOrder.length === 0) {
      setStudyOrder(cards.map((c) => c.id));
    }
  }, [cards, studyOrder.length]);

  function resetStudy(nextCards = cards) {
    setStudyOrder(nextCards.map((c) => c.id));
    setActiveIndex(0);
    setFlipped(false);
  }

  function shuffleStudy() {
    setStudyOrder(shuffleArray(cards.map((c) => c.id)));
    setActiveIndex(0);
    setFlipped(false);
    addToast("Cards shuffled", "Play mode order has been randomized.", "success");
  }

  function nextStudy() {
    if (activeIndex >= orderedStudyCards.length - 1) return;
    setActiveIndex((i) => i + 1);
    setFlipped(false);
  }

  function prevStudy() {
    if (activeIndex <= 0) return;
    setActiveIndex((i) => i - 1);
    setFlipped(false);
  }

  function addCardToOrder(id) {
    setStudyOrder((prev) => [...prev, id]);
  }

  function removeCardFromOrder(id) {
    setStudyOrder((prev) => prev.filter((cardId) => cardId !== id));
  }

  useEffect(() => {
    if (activeIndex >= orderedStudyCards.length) {
      setActiveIndex(Math.max(0, orderedStudyCards.length - 1));
    }
  }, [orderedStudyCards.length, activeIndex]);

  return {
    studyOrder,
    activeIndex,
    flipped,
    setFlipped,
    orderedStudyCards,
    currentStudyCard,
    resetStudy,
    shuffleStudy,
    nextStudy,
    prevStudy,
    addCardToOrder,
    removeCardFromOrder,
  };
}
