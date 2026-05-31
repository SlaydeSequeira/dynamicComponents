import { useRef, useCallback, useState } from "react";

interface UseMouseTiltOptions {
  maxTilt?: number;
  resetTransition?: string;
}

export function useMouseTilt({ maxTilt = 15, resetTransition = "transform 0.5s ease" }: UseMouseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const getNormalized = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const pos = getNormalized(e);
      if (!pos) return;
      const rotX = (0.5 - pos.y) * maxTilt * 2;
      const rotY = (pos.x - 0.5) * maxTilt * 2;
      setStyle({ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` });
    },
    [maxTilt, getNormalized],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)", transition: resetTransition });
  }, [resetTransition]);

  const onMouseEnter = useCallback(() => {
    setStyle((s) => ({ ...s, transition: "none" }));
  }, []);

  return { ref, style, handlers: { onMouseMove, onMouseLeave, onMouseEnter }, getNormalized };
}
