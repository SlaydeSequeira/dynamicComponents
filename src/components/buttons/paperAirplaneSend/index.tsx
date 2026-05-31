import type { PaperAirplaneSendProps, Phase } from "./interfaces";
import { PHASES, ORDER, TIMINGS, speedToMult } from "./utils";
import { usePhaseAnimation } from "../../shared/usePhaseAnimation";
import "./styles/index.css";

export type { PaperAirplaneSendProps } from "./interfaces";

export default function PaperAirplaneSend({
  label = "Send Message",
  successLabel = "Sent!",
  color,
  planeColor,
  speed = 50,
  onSend,
  autoReset = true,
  disabled = false,
}: PaperAirplaneSendProps) {
  const { phase, run, animating } = usePhaseAnimation<Phase>({
    order: ORDER,
    timings: TIMINGS,
    idle: PHASES.IDLE as Phase,
    done: PHASES.DONE as Phase,
    speed,
    autoReset,
    onDone: onSend,
    disabled,
  });
  const showPlane = phase === PHASES.FOLD || phase === PHASES.FLY;
  const planeFlying = phase === PHASES.FLY;

  const mult = speedToMult(speed);
  const rootStyle: Record<string, string> = {
    "--pas-d-fold": `${(0.45 * mult).toFixed(3)}s`,
    "--pas-d-fly": `${(0.55 * mult).toFixed(3)}s`,
  };
  if (color) rootStyle["--pas-bg"] = color;
  if (planeColor) rootStyle["--pas-plane-color"] = planeColor;

  return (
    <div className="pas-shell" style={rootStyle as React.CSSProperties}>
      <button
        className="pas-hit"
        onClick={run}
        disabled={animating || disabled}
        aria-label={label}
      />

      <span className="pas-glow" />

      <span className={`pas-label ${phase === PHASES.IDLE ? "show" : ""}`}>
        <svg className="pas-send-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 2L11 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </span>

      <span
        className={`pas-plane ${showPlane ? "show" : ""} ${planeFlying ? "fly" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M30,16 L2,5 L12,16 Z"
            fill="var(--pas-plane-color, #fff)"
          />
          <path
            d="M30,16 L2,27 L12,16 Z"
            fill="var(--pas-plane-color, #fff)"
            opacity="0.7"
          />
          <path
            d="M12,16 L16,24 L17,17 Z"
            fill="var(--pas-plane-color, #fff)"
            opacity="0.5"
          />
          <line
            x1="30" y1="16" x2="12" y2="16"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="0.5"
          />
        </svg>
      </span>

      <span
        className={`pas-trail ${planeFlying ? "active" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>

      <span className={`pas-flash ${phase === PHASES.FOLD ? "show" : ""}`} />

      <span className={`pas-done ${phase === PHASES.DONE ? "show" : ""}`}>
        <svg viewBox="0 0 24 24" className="pas-check" aria-hidden="true">
          <path
            d="M4 12.5l5 5L20 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {successLabel}
      </span>
    </div>
  );
}
