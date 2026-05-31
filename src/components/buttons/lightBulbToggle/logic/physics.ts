import { clamp } from "../../../shared/utils";
import {
  REST_ARM,
  MAX_STRETCH,
  MAX_SWING_ANGLE,
  type PhysicsState,
} from "../utils";

export type Pivot = { x: number; y: number };

export const pointerToPhysics = (
  clientX: number,
  clientY: number,
  pivot: Pivot,
  scale: number,
): Pick<PhysicsState, "angle" | "stretch"> => {
  const dx = clientX - pivot.x;
  const dy = clientY - pivot.y;
  const minDy = 24 * scale;

  if (dy < minDy) {
    return { angle: 0, stretch: 0 };
  }

  const restArm = REST_ARM * scale;
  const maxDist = restArm + MAX_STRETCH * scale;
  const dist = Math.hypot(dx, dy);
  const clampedDist = Math.min(dist, maxDist);
  const ratio = dist > 0 ? clampedDist / dist : 1;
  const cdx = dx * ratio;
  const cdy = Math.max(dy * ratio, minDy);

  const angle = clamp(Math.atan2(-cdx, cdy), -MAX_SWING_ANGLE, MAX_SWING_ANGLE);
  const actualDist = Math.hypot(cdx, cdy);
  const stretch = Math.max(0, actualDist - restArm);

  return { angle, stretch };
};
