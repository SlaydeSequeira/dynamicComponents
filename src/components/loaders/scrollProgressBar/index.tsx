import type { ScrollProgressBarProps, Character } from "./interfaces";
import { DEFAULT_HEIGHT, CHARACTER_SIZE } from "./utils";
import { CHARACTER_MAP, TRAIL_CHARACTERS } from "./svg/Characters";
import { useScrollProgress } from "./hooks/useScrollProgress";
import "./styles/index.css";

export type { ScrollProgressBarProps, Character } from "./interfaces";

export default function ScrollProgressBar({
  character = "car",
  progress: controlledProgress,
  trackColor,
  progressColor,
  characterColor,
  height = DEFAULT_HEIGHT,
  showTrail = true,
  showPercentage = false,
  onProgress,
}: ScrollProgressBarProps) {
  const progress = useScrollProgress(controlledProgress, onProgress);

  const CharSVG = CHARACTER_MAP[character];
  const hasSpecialTrail = showTrail && TRAIL_CHARACTERS.has(character);

  const vars: Record<string, string> = {
    "--spb-height": `${height}px`,
    "--spb-char-size": `${CHARACTER_SIZE}px`,
  };
  if (trackColor) vars["--spb-track-color"] = trackColor;
  if (progressColor) vars["--spb-progress-color"] = progressColor;
  if (characterColor) vars["--spb-char-color"] = characterColor;

  const fillClass = [
    "spb-fill",
    hasSpecialTrail ? `trail-${character}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className="spb-wrap"
      style={vars as React.CSSProperties}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="spb-character"
        style={{
          left: `${progress}%`,
          transform: `translateX(-${progress}%) translateY(-50%)`,
        }}
      >
        <svg viewBox="0 0 40 32" fill="none">
          <CharSVG />
        </svg>
      </div>

      <div className="spb-track">
        <div
          className={fillClass}
          style={{ width: `${progress}%` }}
        />
      </div>

      {showPercentage && (
        <span className="spb-pct">{Math.round(progress)}%</span>
      )}
    </div>
  );
}
