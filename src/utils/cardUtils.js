export function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getChoices(cards, current) {
  const others = cards
    .filter((c) => c.id !== current.id && c.answer.trim() !== current.answer.trim())
    .map((c) => c.answer)
    .filter(Boolean);
  const distractors = shuffleArray([...new Set(others)]).slice(0, 3);
  const base = shuffleArray([current.answer, ...distractors]);
  return base.length >= 2 ? base : [current.answer, "Not enough cards for distractors"];
}

export function progressPercent(current, total) {
  if (!total) return 0;
  return Math.round((current / total) * 100);
}

export function cls(...items) {
  return items.filter(Boolean).join(" ");
}
