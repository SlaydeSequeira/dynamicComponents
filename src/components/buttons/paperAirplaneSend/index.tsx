import type { PaperAirplaneSendProps, Phase } from "./interfaces";
import { PHASES, ORDER, TIMINGS } from "./utils";
import { speedToMult } from "../../shared/utils";
import { CheckIcon } from "../../shared/CheckIcon";
import { usePhaseAnimation } from "../../shared/usePhaseAnimation";
import { SendIcon } from "./svg/SendIcon";
import { PlaneSvg } from "./svg/PlaneSvg";
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
        <SendIcon />
        {label}
      </span>

      <span
        className={`pas-plane ${showPlane ? "show" : ""} ${planeFlying ? "fly" : ""}`}
        aria-hidden="true"
      >
        <PlaneSvg />
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
        <CheckIcon className="pas-check" />
        {successLabel}
      </span>
    </div>
  );
}
