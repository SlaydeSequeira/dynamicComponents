import type { JellySliderProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_COLOR, DEFAULT_GLOW } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import { useWebGPUSlider } from "./hooks/useWebGPUSlider";
import { useSliderPointer } from "./hooks/useSliderPointer";
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

  const { containerRef, supported } = useWebGPUSlider(color, glowTint);
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useSliderPointer(containerRef, setValue);

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
