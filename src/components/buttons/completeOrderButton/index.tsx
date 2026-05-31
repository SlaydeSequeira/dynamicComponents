import type { CompleteOrderButtonProps, Phase } from "./interfaces";
import { PHASES, ORDER, TIMINGS } from "./utils";
import { shade, speedToMult } from "../../shared/utils";
import { CheckIcon } from "../../shared/CheckIcon";
import { usePhaseAnimation } from "../../shared/usePhaseAnimation";
import { Scene } from "./sub/Scene";
import { Truck } from "./sub/Truck";
import "./styles/index.css";
import "./styles/hd.css";

export type { CompleteOrderButtonProps } from "./interfaces";

export default function CompleteOrderButton({
  mode = "day",
  highDefinition = false,
  truckColor,
  truckSecondaryColor,
  boxColor,
  shouldHeadlightComeOn = true,
  shouldExhaustReleaseSmoke = true,
  speed = 50,
  label = "Complete Order",
  successLabel = "Order Placed",
  onComplete,
  autoReset = true,
}: CompleteOrderButtonProps) {
  const { phase, run, animating } = usePhaseAnimation<Phase>({
    order: ORDER,
    timings: TIMINGS,
    idle: PHASES.IDLE as Phase,
    done: PHASES.DONE as Phase,
    speed,
    autoReset,
    onDone: onComplete,
  });
  const sceneActive = ([PHASES.REVEAL, PHASES.DRIVE_IN, PHASES.OPEN, PHASES.LOAD, PHASES.CLOSE, PHASES.LEAVE] as Phase[]).includes(phase);
  const showTruck = ([PHASES.DRIVE_IN, PHASES.OPEN, PHASES.LOAD, PHASES.CLOSE, PHASES.LEAVE] as Phase[]).includes(phase);
  const doorsOpen = phase === PHASES.OPEN || phase === PHASES.LOAD;
  const pkgVisible = phase === PHASES.OPEN || phase === PHASES.LOAD;
  const pkgLoading = phase === PHASES.LOAD;
  const pkgGone = phase === PHASES.CLOSE || phase === PHASES.LEAVE;
  const atTail = phase === PHASES.CLOSE || phase === PHASES.LEAVE;
  const lightsOn = shouldHeadlightComeOn && atTail;
  const smokeOn = shouldExhaustReleaseSmoke && atTail;

  const mult = speedToMult(speed);
  const rootStyle: Record<string, string> = {
    "--d-reveal": `${(0.6 * mult).toFixed(3)}s`,
    "--d-drive": `${(0.95 * mult).toFixed(3)}s`,
    "--d-door": `${(0.5 * mult).toFixed(3)}s`,
    "--d-load": `${(0.8 * mult).toFixed(3)}s`,
    "--d-leave": `${(0.9 * mult).toFixed(3)}s`,
  };
  if (truckColor) {
    rootStyle["--blue"] = truckColor;
    rootStyle["--blue-2"] = shade(truckColor, 14)!;
  }
  if (truckSecondaryColor) {
    rootStyle["--white-hi"] = shade(truckSecondaryColor, 12)!;
    rootStyle["--white"] = truckSecondaryColor;
    rootStyle["--white-2"] = shade(truckSecondaryColor, -12)!;
  }
  if (boxColor) {
    rootStyle["--kraft"] = boxColor;
    rootStyle["--kraft-2"] = shade(boxColor, -18)!;
  }

  return (
    <div
      className={`cob-shell ${mode === "night" ? "cob-night" : ""} ${highDefinition ? "cob-hd" : ""}`}
      style={rootStyle as React.CSSProperties}
    >
      <button
        className="cob-hit"
        onClick={run}
        disabled={animating}
        aria-label={label}
      />

      <span className={`cob-label ${phase === PHASES.IDLE ? "show" : ""}`}>
        {label}
      </span>

      <span className={`cob-done ${phase === PHASES.DONE ? "show" : ""}`}>
        <CheckIcon className="cob-check" />
        {successLabel}
      </span>

      <Scene sceneActive={sceneActive} mode={mode} highDefinition={highDefinition} />

      <Truck
        showTruck={showTruck}
        phase={phase}
        doorsOpen={doorsOpen}
        pkgVisible={pkgVisible}
        pkgLoading={pkgLoading}
        pkgGone={pkgGone}
        lightsOn={lightsOn}
        smokeOn={smokeOn}
        highDefinition={highDefinition}
      />
    </div>
  );
}
