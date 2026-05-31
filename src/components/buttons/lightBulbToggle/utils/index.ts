/** Fixture cap + glass − overlap + cord + half knob (px at scale 1) */
export const REST_ARM = 147;

export const ANGLE_STIFFNESS = 0.04;
export const STRETCH_STIFFNESS = 0.06;
export const ANGULAR_DAMPING = 0.96;
export const STRETCH_DAMPING = 0.95;
export const GRAVITY = 0.003;
export const PULL_IMPULSE = 0.15;
export const REST_THRESHOLD = 0.005;
export const BASE_CORD_LENGTH = 55;
export const MAX_STRETCH = 60;
export const TOGGLE_THRESHOLD = 15;
export const WIRE_HEIGHT = 40;
export const MAX_SWING_ANGLE = Math.PI / 3;

export type PhysicsState = {
  angle: number;
  stretch: number;
  angularVel: number;
  stretchVel: number;
};

export const createRestState = (): PhysicsState => ({
  angle: 0,
  stretch: 0,
  angularVel: 0,
  stretchVel: 0,
});
