import { useState, useEffect } from "react";

export function useScrollProgress(
  controlledProgress: number | undefined,
  onProgress?: (progress: number) => void,
) {
  const [autoProgress, setAutoProgress] = useState(0);
  const progress = Math.min(100, Math.max(0, controlledProgress ?? autoProgress));

  useEffect(() => {
    if (controlledProgress !== undefined) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, pct));
      setAutoProgress(clamped);
      onProgress?.(clamped);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlledProgress, onProgress]);

  useEffect(() => {
    if (controlledProgress !== undefined) {
      onProgress?.(controlledProgress);
    }
  }, [controlledProgress, onProgress]);

  return progress;
}
