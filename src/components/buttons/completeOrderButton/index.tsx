import type { CompleteOrderButtonProps, Phase } from "./interfaces";
import { PHASES, ORDER, TIMINGS } from "./utils";
import { shade, speedToMult } from "../../shared/utils";
import { CheckIcon } from "../../shared/CheckIcon";
import { usePhaseAnimation } from "../../shared/usePhaseAnimation";
import HdHillsSvg from "./hd/HdHillsSvg";
import {
  HdBodyLayers,
  HdCabLayers,
  HdPackageLayers,
  HdRearAssembly,
  HdSkyLayers,
  HdSmokeExtra,
  HdTreeLeaves,
  HdTruckLayers,
  HdWindowLayers,
} from "./hd/HdLayers";
import "./styles/index.css";
import "./styles/hd.css";

export type { CompleteOrderButtonProps } from "./interfaces";

const DefaultHillsSvg = () => (
  <svg className="cob-hills" viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,60 C60,50 118,55 180,49 C242,43 300,52 360,47 L360,68 L0,68 Z" fill="#c2e4c6" />
    <path d="M0,64 C52,53 96,52 142,58 C188,64 232,49 286,55 C322,59 346,60 360,56 L360,68 L0,68 Z" fill="#9bd183" />
    <path d="M0,66 C56,61 102,60 152,63 C206,66 246,57 300,61 C330,63 348,64 360,62 L360,70 L0,70 Z" fill="#7cbd65" />
  </svg>
);

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

      <span className={`cob-sky ${sceneActive ? "active" : ""}`} aria-hidden="true">
        {highDefinition && <HdSkyLayers />}
        {mode === "night" ? (
          <svg className="cob-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <span className="cob-sun" />
        )}
        <span className="cob-stars" />
        <span className="cob-cloud c1" />
        <span className="cob-cloud c2" />
        {highDefinition ? <HdHillsSvg /> : <DefaultHillsSvg />}
        <span className="cob-tree t1">
          <i className="canopy" />
          {highDefinition && <HdTreeLeaves />}
          <i className="trunk" />
        </span>
        <span className="cob-tree t2">
          <i className="canopy" />
          {highDefinition && <HdTreeLeaves />}
          <i className="trunk" />
        </span>
        <span className="cob-tree t3">
          <i className="canopy" />
          {highDefinition && <HdTreeLeaves compact />}
          <i className="trunk" />
        </span>
        <span className="cob-ground" />
        <span className="cob-road" />
      </span>

      <span
        className={`cob-truck ${showTruck ? "in" : ""} ${phase === PHASES.LEAVE ? "leave" : ""} ${lightsOn ? "lights" : ""} ${smokeOn ? "smoking" : ""}`}
      >
        <span className="cob-shadow" />
        <span className="cob-pipe" />
        <span className="cob-smoke">
          <i /> <i /> <i />
          {highDefinition && <HdSmokeExtra />}
        </span>
        <span className="cob-cargo">
          <span className="cob-hold" />
          {highDefinition && <HdRearAssembly />}
          <span className={`cob-package ${pkgVisible ? "show" : ""} ${pkgLoading ? "loading" : ""} ${pkgGone ? "gone" : ""}`}>
            <span className="cob-tape-h" />
            <span className="cob-tape-v" />
            <span className="cob-flap" />
            {highDefinition && <HdPackageLayers />}
          </span>
          <span className="cob-body">
            <span className="cob-stripe" />
            <span className="cob-logo" />
            <span className="cob-seam" />
            {highDefinition && <HdBodyLayers />}
          </span>
          <span className={`cob-door ${doorsOpen ? "open" : ""}`}>
            <span className="cob-handle" />
            {highDefinition && <span className="cob-hd-door-track" />}
            {highDefinition && <span className="cob-hd-hinge" />}
          </span>
        </span>
        <span className="cob-cab">
          <span className="cob-window">
            {highDefinition && <HdWindowLayers />}
          </span>
          <span className="cob-grille" />
          <span className="cob-headlight" />
          <span className="cob-mirror" />
          {highDefinition && <HdCabLayers />}
        </span>
        <span className="cob-bumper" />
        <span className="cob-beam" />
        {highDefinition && <HdTruckLayers />}
        <span className="cob-fender f1" />
        <span className="cob-fender f2" />
        <span className="cob-wheel w1"><i /></span>
        <span className="cob-wheel w2"><i /></span>
      </span>
    </div>
  );
}
