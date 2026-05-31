import { useCallback, useRef, useEffect } from "react";
import { clamp } from "../../../shared/utils";
import {
  ANGLE_STIFFNESS,
  STRETCH_STIFFNESS,
  ANGULAR_DAMPING,
  STRETCH_DAMPING,
  GRAVITY,
  PULL_IMPULSE,
  REST_THRESHOLD,
  BASE_CORD_LENGTH,
  TOGGLE_THRESHOLD,
  WIRE_HEIGHT,
  MAX_SWING_ANGLE,
  createRestState,
  type PhysicsState,
} from "../utils";
import { pointerToPhysics, type Pivot } from "../logic/physics";

interface UseLightBulbPhysicsProps {
  isOn: boolean;
  setIsOn: (v: boolean) => void;
  scale: number;
}

export function useLightBulbPhysics({ isOn, setIsOn, scale }: UseLightBulbPhysicsProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const hangingRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<PhysicsState>(createRestState());
  const rafRef = useRef(0);

  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const pivotRef = useRef<Pivot>({ x: 0, y: 0 });
  const currentPhysicsRef = useRef<Pick<PhysicsState, "angle" | "stretch">>({
    angle: 0,
    stretch: 0,
  });
  const lastMoveRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const prevMoveRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const isOnRef = useRef(isOn);
  isOnRef.current = isOn;

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const getPivot = useCallback((): Pivot | null => {
    const shell = shellRef.current;
    if (!shell) return null;
    const rect = shell.getBoundingClientRect();
    const s = scaleRef.current;
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + WIRE_HEIGHT * s,
    };
  }, []);

  const updateVisuals = useCallback((angle: number, stretch: number) => {
    const s = scaleRef.current;
    if (hangingRef.current) {
      const angleDeg = (angle * 180) / Math.PI;
      hangingRef.current.style.transform = angleDeg
        ? `rotate(${angleDeg}deg)`
        : "";
    }
    if (cordRef.current) {
      cordRef.current.style.height = `${BASE_CORD_LENGTH * s + stretch}px`;
    }
  }, []);

  const animate = useCallback(() => {
    const state = springRef.current;

    state.angularVel +=
      -GRAVITY * Math.sin(state.angle) - ANGLE_STIFFNESS * state.angle;
    state.stretchVel += -STRETCH_STIFFNESS * state.stretch;

    state.angularVel *= ANGULAR_DAMPING;
    state.stretchVel *= STRETCH_DAMPING;
    state.angle += state.angularVel;
    state.stretch += state.stretchVel;

    state.angle = clamp(state.angle, -MAX_SWING_ANGLE, MAX_SWING_ANGLE);
    state.stretch = Math.max(0, state.stretch);

    updateVisuals(state.angle, state.stretch);

    if (
      Math.abs(state.angle) < REST_THRESHOLD &&
      Math.abs(state.stretch) < REST_THRESHOLD &&
      Math.abs(state.angularVel) < REST_THRESHOLD &&
      Math.abs(state.stretchVel) < REST_THRESHOLD
    ) {
      Object.assign(state, createRestState());
      updateVisuals(0, 0);
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [updateVisuals]);

  const toggle = useCallback(() => {
    setIsOn(!isOnRef.current);
  }, [setIsOn]);

  const startSpring = useCallback(
    (state: PhysicsState) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      springRef.current = { ...state };
      rafRef.current = requestAnimationFrame(animate);
    },
    [animate],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      const pivot = getPivot();
      if (!pivot) return;

      pivotRef.current = pivot;
      draggingRef.current = true;
      hasDraggedRef.current = false;
      currentPhysicsRef.current = { angle: 0, stretch: 0 };
      lastMoveRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      prevMoveRef.current = null;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [getPivot],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;

      const physics = pointerToPhysics(
        e.clientX,
        e.clientY,
        pivotRef.current,
        scaleRef.current,
      );

      if (
        Math.abs(physics.angle) > 0.02 ||
        physics.stretch > 3 * scaleRef.current
      ) {
        hasDraggedRef.current = true;
      }

      currentPhysicsRef.current = physics;
      updateVisuals(physics.angle, physics.stretch);

      prevMoveRef.current = lastMoveRef.current;
      lastMoveRef.current = {
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
      };
    },
    [updateVisuals],
  );

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const { angle, stretch } = currentPhysicsRef.current;
    let angularVel = 0;
    let stretchVel = 0;

    if (prevMoveRef.current && lastMoveRef.current) {
      const dt = (lastMoveRef.current.t - prevMoveRef.current.t) / 16;
      if (dt > 0) {
        const prev = pointerToPhysics(
          prevMoveRef.current.x,
          prevMoveRef.current.y,
          pivotRef.current,
          scaleRef.current,
        );
        const curr = pointerToPhysics(
          lastMoveRef.current.x,
          lastMoveRef.current.y,
          pivotRef.current,
          scaleRef.current,
        );
        angularVel = (curr.angle - prev.angle) / dt;
        stretchVel = (curr.stretch - prev.stretch) / dt;
      }
    }

    if (!hasDraggedRef.current) {
      toggle();
      startSpring({
        angle: 0,
        stretch: 0,
        angularVel: PULL_IMPULSE,
        stretchVel: PULL_IMPULSE * 2,
      });
    } else if (stretch > TOGGLE_THRESHOLD * scaleRef.current) {
      toggle();
      startSpring({ angle, stretch, angularVel, stretchVel });
    } else {
      startSpring({ angle, stretch, angularVel, stretchVel });
    }

    currentPhysicsRef.current = { angle: 0, stretch: 0 };
    lastMoveRef.current = null;
    prevMoveRef.current = null;
  }, [toggle, startSpring]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    shellRef,
    cordRef,
    hangingRef,
    isOn,
    toggle,
    startSpring,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
