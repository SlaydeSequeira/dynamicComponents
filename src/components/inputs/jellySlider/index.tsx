import { useRef, useEffect, useState, useCallback } from "react";
import type { JellySliderProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_COLOR, DEFAULT_GLOW } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import "./styles/index.css";

export type { JellySliderProps } from "./interfaces";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<any>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const draggingRef = useRef(false);
  const targetRef = useRef(value);
  const resolutionRef = useRef([0, 0]);
  const [supported, setSupported] = useState(true);

  targetRef.current = value;

  const updateTarget = useCallback(
    (clientX: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const normalized = Math.max(0, Math.min(1, ((clientX - rect.left) / rect.width - 0.15) / 0.7));
      setValue(normalized);
    },
    [setValue],
  );

  useEffect(() => {
    if (!navigator.gpu) {
      setSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    (async () => {
      const tgpu = await import("typegpu");
      const d = await import("typegpu/data");
      const { JellySlider } = await import("gooui");

      if (destroyed) return;

      const root = await tgpu.default.init();
      if (destroyed) { root.destroy(); return; }

      const format = navigator.gpu.getPreferredCanvasFormat();
      const ctx = canvas.getContext("webgpu");
      if (!ctx) { root.destroy(); setSupported(false); return; }

      ctx.configure({ device: root.device, format, alphaMode: "premultiplied" });

      const slider = new JellySlider({
        root,
        targetFormat: format,
        jellyColor: d.vec3f(...color),
        glowTint: d.vec3f(...glowTint),
      });

      sliderRef.current = slider;

      const ro = new ResizeObserver(([entry]) => {
        const w = entry.contentRect.width * devicePixelRatio;
        const h = entry.contentRect.height * devicePixelRatio;
        resolutionRef.current = [w, h];
        canvas.width = w;
        canvas.height = h;
        slider.handleResize(w, h);
      });
      ro.observe(canvas);

      const render = () => {
        if (destroyed) return;
        const now = performance.now();
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
        lastTimeRef.current = now;

        slider.value += (targetRef.current - slider.value) * Math.min(1, dt * 10);
        slider.update(dt);

        const [rw, rh] = resolutionRef.current;
        if (rw > 0 && rh > 0) {
          slider.render(ctx.getCurrentTexture().createView(), rw, rh);
        }

        rafRef.current = requestAnimationFrame(render);
      };

      rafRef.current = requestAnimationFrame(render);

      return () => {
        destroyed = true;
        cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        root.destroy();
      };
    })().then((cleanup) => {
      if (destroyed && cleanup) cleanup();
      else if (cleanup) {
        const prev = rafRef.current;
        rafRef.current = 0;
        cancelAnimationFrame(prev);
        // Store cleanup for unmount
        (containerRef.current as any)?.__cleanup?.();
        if (containerRef.current) (containerRef.current as any).__cleanup = cleanup;
      }
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafRef.current);
      (containerRef.current as any)?.__cleanup?.();
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateTarget(e.clientX);
    },
    [updateTarget],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      updateTarget(e.clientX);
    },
    [updateTarget],
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
      <canvas ref={canvasRef} className="js-canvas" />
      {showPercentage && (
        <span className="js-label">{Math.round(value * 100)}%</span>
      )}
    </div>
  );
}
