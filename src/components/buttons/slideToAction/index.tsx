import type { SlideToActionProps } from "./interfaces";
import { BASE_WIDTH, BASE_HEIGHT, KNOB_PAD } from "./utils";
import { CheckIcon } from "../../shared/CheckIcon";
import { DottedArrow } from "./svg/DottedArrow";
import { useSlideGesture } from "./hooks/useSlideGesture";
import "./styles/index.css";

export type { SlideToActionProps } from "./interfaces";

export default function SlideToAction({
  label = "Book a call",
  completedLabel = "Booked!",
  accentColor,
  icon,
  threshold = 0.8,
  onComplete,
  autoReset = true,
  width: w = BASE_WIDTH,
  height: h = BASE_HEIGHT,
}: SlideToActionProps) {
  const pad = KNOB_PAD;
  const knobW = h * 1.5;
  const maxSlide = w - knobW - pad * 2;
  const fullWidth = w - pad * 2;

  const { completed, offset, animating, shellRef, onPointerDown, onPointerMove, onPointerUp } =
    useSlideGesture({ maxSlide, threshold, onComplete, autoReset });

  const vars = {
    "--sta-w": `${w}px`,
    "--sta-h": `${h}px`,
    "--sta-knob-w": `${knobW}px`,
    "--sta-pad": `${pad}px`,
  } as React.CSSProperties;

  const currentWidth = completed ? fullWidth : knobW + offset;

  const knobStyle: React.CSSProperties = {
    left: pad,
    width: currentWidth,
  };

  if (accentColor) {
    knobStyle.background = `linear-gradient(180deg, ${accentColor} 0%, ${accentColor} 100%)`;
  }

  return (
    <div
      ref={shellRef}
      className={`sta-shell ${completed ? "completed" : ""}`}
      style={vars}
    >
      <span className="sta-label">
        {completed ? completedLabel : label}
      </span>

      <div
        className={`sta-knob ${animating ? "animating" : ""}`}
        style={knobStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="sta-icon" style={{ position: "absolute", left: knobW / 2, transform: "translateX(-50%)" }}>
          {icon ?? <DottedArrow />}
        </span>
      </div>

      <span className="sta-check">
        <CheckIcon stroke="rgba(0,0,0,0.6)" />
      </span>
    </div>
  );
}
