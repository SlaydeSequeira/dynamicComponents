import { useState, useRef, useCallback } from "react";
import { speedToMult } from "./utils";

interface UsePhaseAnimationOptions<P extends string> {
  order: P[];
  timings: Record<P, number>;
  idle: P;
  done: P;
  speed: number;
  autoReset: boolean;
  onDone?: () => void;
  disabled?: boolean;
}

export function usePhaseAnimation<P extends string>({
  order,
  timings,
  idle,
  done,
  speed,
  autoReset,
  onDone,
  disabled = false,
}: UsePhaseAnimationOptions<P>) {
  const [phase, setPhase] = useState<P>(idle);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    if (phase !== idle || disabled) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const mult = speedToMult(speed);
    let elapsed = 0;
    for (const p of order) {
      timersRef.current.push(
        setTimeout(() => {
          setPhase(p);
          if (p === done && typeof onDone === "function") onDone();
        }, elapsed),
      );
      elapsed += timings[p] * mult;
    }
    if (autoReset) {
      timersRef.current.push(setTimeout(() => setPhase(idle), elapsed));
    }
  }, [phase, idle, done, speed, autoReset, onDone, disabled, order, timings]);

  const animating = phase !== idle && phase !== done;

  return { phase, run, animating } as const;
}
