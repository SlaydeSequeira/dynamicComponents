import type { Phase } from "../interfaces";

export { shade, speedToMult } from "../../../shared/utils";

export const PHASES: Record<string, Phase> = {
  IDLE: "idle",
  REVEAL: "reveal",
  DRIVE_IN: "driveIn",
  OPEN: "open",
  LOAD: "load",
  CLOSE: "close",
  LEAVE: "leave",
  DONE: "done",
};

export const TIMINGS: Record<Phase, number> = {
  idle: 0,
  reveal: 700,
  driveIn: 1000,
  open: 650,
  load: 850,
  close: 600,
  leave: 900,
  done: 1400,
};

export const ORDER: Phase[] = [
  PHASES.REVEAL,
  PHASES.DRIVE_IN,
  PHASES.OPEN,
  PHASES.LOAD,
  PHASES.CLOSE,
  PHASES.LEAVE,
  PHASES.DONE,
];
