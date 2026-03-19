import { useState } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  function addToast(title, message = "", type = "info") {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, title, message, type }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((item) => item.id !== id));
    }, 3200);
  }

  function removeToast(id) {
    setToasts((t) => t.filter((item) => item.id !== id));
  }

  return { toasts, addToast, removeToast };
}
