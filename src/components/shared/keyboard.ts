import type { KeyboardEvent } from "react";

export function toggleKeyHandler(action: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };
}
