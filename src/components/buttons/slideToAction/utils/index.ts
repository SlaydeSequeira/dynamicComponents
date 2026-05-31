export const BASE_WIDTH = 320;
export const BASE_HEIGHT = 80;
export const KNOB_PAD = 8;

export function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}
