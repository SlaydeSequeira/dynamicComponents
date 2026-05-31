import { useState, useEffect } from "react";

export function useAutoProgress(controlledProgress: number | undefined): number {
  const [autoProgress, setAutoProgress] = useState(0);

  useEffect(() => {
    if (controlledProgress !== undefined) return;
    const interval = setInterval(() => {
      setAutoProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, [controlledProgress]);

  return controlledProgress ?? autoProgress;
}
