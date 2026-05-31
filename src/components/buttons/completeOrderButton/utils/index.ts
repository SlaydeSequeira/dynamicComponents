import type { Phase } from "../interfaces";

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

export function shade(hex: string | undefined, pct: number): string | undefined {
  if (!hex) return hex;
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h, 16);
  if (Number.isNaN(num)) return hex;
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct) / 100;
  r = Math.round((t - r) * p) + r;
  g = Math.round((t - g) * p) + g;
  b = Math.round((t - b) * p) + b;
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function speedToMult(speed: number): number {
  const v = Math.min(100, Math.max(1, Number(speed) || 50));
  return v >= 50 ? 1 - ((v - 50) / 50) * 0.6 : 1 + ((50 - v) / 49) * 1.1;
}
