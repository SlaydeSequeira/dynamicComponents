import type { ScratchCardProps } from "./interfaces";
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_INTERNAL_COLOR,
  DEFAULT_INNER_TEXT,
  DEFAULT_OUTER_TEXT,
  DEFAULT_OVERLAY_COLOR,
} from "./utils";
import { useScratch } from "./hooks/useScratch";
import "./styles/index.css";

export type { ScratchCardProps } from "./interfaces";

export default function ScratchCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  overlayColor = DEFAULT_OVERLAY_COLOR,
  outerText = DEFAULT_OUTER_TEXT,
  internalColor = DEFAULT_INTERNAL_COLOR,
  innerText = DEFAULT_INNER_TEXT,
  brushSize = 25,
  revealAt = 50,
  onReveal,
}: ScratchCardProps) {
  const {
    canvasRef,
    particleCanvasRef,
    revealed,
    scratchPct,
    canvasHandlers,
  } = useScratch({ width, height, overlayColor, outerText, brushSize, revealAt, onReveal });

  return (
    <div
      className="sc-container"
      style={{ "--sc-w": `${width}px`, "--sc-h": `${height}px` } as React.CSSProperties}
    >
      <div className="sc-content">
        {children ?? (
          <div className="sc-inner-face" style={{ background: internalColor }}>
            {innerText}
          </div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className={`sc-canvas ${revealed ? "revealed" : ""}`}
        {...canvasHandlers}
      />
      <canvas
        ref={particleCanvasRef}
        className="sc-particles"
      />
      {!revealed && scratchPct > 0 && (
        <div className="sc-progress">
          <div className="sc-progress-fill" style={{ width: `${(scratchPct / revealAt) * 100}%` }} />
        </div>
      )}
    </div>
  );
}
