import { deepTeal } from "../constants/theme";
import { Modal } from "./ui/Modal";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

export function EditModal({ open, onClose, onSave, draft, setDraft, isEditing }) {
  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit flashcard" : "Create flashcard"}>
      <div className="grid gap-4">
        <Field label="Question">
          <Textarea
            value={draft.question}
            onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
            placeholder="Enter the flashcard question"
          />
        </Field>
        <Field label="Answer">
          <Textarea
            value={draft.answer}
            onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))}
            placeholder="Enter the answer"
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Apply">
            <Textarea
              value={draft.apply}
              onChange={(e) => setDraft((d) => ({ ...d, apply: e.target.value }))}
              placeholder="Add an application prompt"
              className="min-h-[120px]"
            />
          </Field>
          <Field label="Reflection">
            <Textarea
              value={draft.reflection}
              onChange={(e) => setDraft((d) => ({ ...d, reflection: e.target.value }))}
              placeholder="Add a reflection prompt"
              className="min-h-[120px]"
            />
          </Field>
        </div>
        <Field label="Image URL (optional)">
          <Input
            value={draft.image}
            onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </Field>
        {draft.image ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img
              src={draft.image}
              alt="Flashcard preview"
              className="max-h-64 w-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            style={{ backgroundColor: deepTeal }}
          >
            {isEditing ? "Save changes" : "Add flashcard"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
