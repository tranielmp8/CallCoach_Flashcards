import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useCards(addToast) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ question: "", answer: "", apply: "", reflection: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("call_coach_cards")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      addToast("Failed to load cards", error.message, "error");
    } else {
      setCards(data || []);
    }
    setLoading(false);
  }, [addToast]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  function openCreate() {
    setEditingId(null);
    setDraft({ question: "", answer: "", apply: "", reflection: "", image: "" });
    setEditOpen(true);
  }

  function openEdit(card) {
    setEditingId(card.id);
    setDraft({
      question: card.question,
      answer: card.answer,
      apply: card.apply,
      reflection: card.reflection,
      image: card.image,
    });
    setEditOpen(true);
  }

  async function saveCard(onNewCard) {
    if (!draft.question.trim() || !draft.answer.trim()) {
      addToast("Question and answer required", "Complete the essential fields before saving.", "error");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("call_coach_cards")
        .update({
          question: draft.question.trim(),
          answer: draft.answer.trim(),
          apply: draft.apply.trim(),
          reflection: draft.reflection.trim(),
          image: draft.image.trim(),
        })
        .eq("id", editingId);

      if (error) {
        addToast("Failed to update card", error.message, "error");
        return;
      }

      setCards((prev) =>
        prev.map((card) =>
          card.id === editingId
            ? { ...card, ...draft, question: draft.question.trim(), answer: draft.answer.trim() }
            : card
        )
      );
      addToast("Flashcard updated", "Your changes were saved.", "success");
    } else {
      const { data, error } = await supabase
        .from("call_coach_cards")
        .insert({
          question: draft.question.trim(),
          answer: draft.answer.trim(),
          apply: draft.apply.trim(),
          reflection: draft.reflection.trim(),
          image: draft.image.trim(),
        })
        .select()
        .single();

      if (error) {
        addToast("Failed to create card", error.message, "error");
        return;
      }

      setCards((prev) => [...prev, data]);
      onNewCard?.(data);
      addToast("Flashcard created", "A new card has been added to your deck.", "success");
    }
    setEditOpen(false);
  }

  async function deleteCard(id, onDelete) {
    const { error } = await supabase.from("call_coach_cards").delete().eq("id", id);

    if (error) {
      addToast("Failed to delete card", error.message, "error");
      return;
    }

    setCards((prev) => prev.filter((card) => card.id !== id));
    onDelete?.(id);
    addToast("Flashcard removed", "The card was deleted from the deck.", "info");
  }

  return {
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
  };
}
