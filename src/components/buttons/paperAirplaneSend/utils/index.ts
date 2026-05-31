import type { Phase } from "../interfaces";

export const PHASES: Record<string, Phase> = {
  IDLE: "idle",
  FOLD: "fold",
  FLY: "fly",
  DONE: "done",
};

export const TIMINGS: Record<Phase, number> = {
  idle: 0,
  fold: 550,
  fly: 650,
  done: 1200,
};

export const ORDER: Phase[] = [PHASES.FOLD, PHASES.FLY, PHASES.DONE];

export function speedToMult(speed: number): number {
  const v = Math.min(100, Math.max(1, Number(speed) || 50));
  return v >= 50 ? 1 - ((v - 50) / 50) * 0.6 : 1 + ((50 - v) / 49) * 1.1;
}
