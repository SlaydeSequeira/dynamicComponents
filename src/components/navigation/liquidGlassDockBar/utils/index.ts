import { clamp } from "../../../shared/utils";

export const DEFAULT_BASE_SIZE = 48;
export const DEFAULT_MAX_SIZE = 84;
export const DEFAULT_MAGNIFICATION = 160;
export const DEFAULT_GAP = 12;

/** Per-frame lerp factor toward the target size — higher = snappier */
export const SMOOTHING = 0.32;

/**
 * macOS-style magnification falloff. Returns the target size for a tile whose
 * center sits `distance` px from the cursor. A cosine bell gives a smooth ramp
 * that peaks at `max` directly under the cursor and eases back to `base` once
 * the cursor passes beyond `radius`.
 */
export function magnifiedSize(
  distance: number,
  radius: number,
  base: number,
  max: number
): number {
  if (radius <= 0 || distance >= radius) return base;
  const t = clamp(distance / radius, 0, 1);
  const falloff = (Math.cos(t * Math.PI) + 1) / 2; // 1 at center → 0 at edge
  return base + (max - base) * falloff;
}
