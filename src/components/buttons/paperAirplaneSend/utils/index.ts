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
