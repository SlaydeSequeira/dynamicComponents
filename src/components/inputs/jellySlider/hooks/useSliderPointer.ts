import { useRef, useCallback } from "react";

const MOUSE_MIN_X = 0.15;
const MOUSE_MAX_X = 0.85;

function clientXToValue(clientX: number, rect: DOMRect): number {
  const normalized = (clientX - rect.left) / rect.width;
  const clamped = Math.max(MOUSE_MIN_X, Math.min(MOUSE_MAX_X, normalized));
  return (clamped - MOUSE_MIN_X) / (MOUSE_MAX_X - MOUSE_MIN_X);
}

export function useSliderPointer(
  containerRef: React.RefObject<HTMLDivElement | null>,
  setValue: (v: number) => void,
) {
  const draggingRef = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setValue(clientXToValue(e.clientX, rect));
    },
    [containerRef, setValue],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setValue(clientXToValue(e.clientX, rect));
    },
    [containerRef, setValue],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
