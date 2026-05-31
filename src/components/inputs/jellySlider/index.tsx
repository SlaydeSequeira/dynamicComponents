import { useRef, useEffect, useState, useCallback } from "react";
import type { JellySliderProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_COLOR, DEFAULT_GLOW } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import "./styles/index.css";

export type { JellySliderProps } from "./interfaces";

const MOUSE_MIN_X = 0.15;
const MOUSE_MAX_X = 0.85;

function clientXToValue(clientX: number, rect: DOMRect): number {
  const normalized = (clientX - rect.left) / rect.width;
  const clamped = Math.max(MOUSE_MIN_X, Math.min(MOUSE_MAX_X, normalized));
  return (clamped - MOUSE_MIN_X) / (MOUSE_MAX_X - MOUSE_MIN_X);
}

export default function JellySliderComponent({
  value: controlledValue,
  onChange,
  color = DEFAULT_COLOR,
  glowTint = DEFAULT_GLOW,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  showPercentage = true,
}: JellySliderProps) {
  const [value, setValue] = useControllableState({
    controlledValue,
    defaultValue: 0,
    onChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!navigator.gpu) {
      setSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const tgpu = await import("typegpu");
      const d = await import("typegpu/data");
      const { CanvasJellySlider } = await import("gooui");

      if (destroyed) return;

      const root = await tgpu.default.init();
      if (destroyed) { root.destroy(); return; }

      const slider = new CanvasJellySlider({
        root,
        jellyColor: d.vec3f(...color),
        glowTint: d.vec3f(...glowTint),
      });

      container.prepend(slider.canvas);

      cleanup = () => {
        slider.canvas.remove();
        root.destroy();
      };
    })();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setValue(clientXToValue(e.clientX, rect));
    },
    [setValue],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setValue(clientXToValue(e.clientX, rect));
    },
    [setValue],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  if (!supported) {
    return (
      <div
        className="js-container"
        style={{ "--js-w": `${width}px`, "--js-h": `${height}px` } as React.CSSProperties}
      >
        <div className="js-fallback">WebGPU not supported in this browser</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="js-container"
      style={{ "--js-w": `${width}px`, "--js-h": `${height}px` } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {showPercentage && (
        <span className="js-label">{Math.round(value * 100)}%</span>
      )}
    </div>
  );
}
