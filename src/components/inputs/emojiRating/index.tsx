import type { EmojiRatingProps } from "./interfaces";
import { DEFAULT_WIDTH, getFace } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import "./styles/index.css";

export type { EmojiRatingProps } from "./interfaces";

export default function EmojiRating({
  value: controlledValue,
  onChange,
  width = DEFAULT_WIDTH,
  emojiSize = 48,
}: EmojiRatingProps) {
  const [value, handleChange] = useControllableState({
    controlledValue,
    defaultValue: 0.5,
    onChange,
  });

  const face = getFace(value);
  const trackUsable = width - emojiSize;
  const faceLeft = value * trackUsable;

  const vars = {
    "--er-w": `${width}px`,
    "--er-emoji": `${emojiSize}px`,
  } as React.CSSProperties;

  return (
    <div className="er-container" style={vars}>
      <div className="er-track-wrap">
        <div className="er-track" />
        <div className="er-face" style={{ left: faceLeft, background: face.color }}>
          <svg viewBox="0 0 36 36">
            <ellipse cx="12" cy="14" rx={face.eyeRx} ry={face.eyeRy} fill="#333" />
            <ellipse cx="24" cy="14" rx={face.eyeRx} ry={face.eyeRy} fill="#333" />
            <path
              d={`M12,${face.mouthY1} Q18,${face.mouthCtrlY} 24,${face.mouthY2}`}
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <input
          className="er-input"
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </div>
      <span className="er-label" style={{ color: face.color }}>{face.label}</span>
    </div>
  );
}
