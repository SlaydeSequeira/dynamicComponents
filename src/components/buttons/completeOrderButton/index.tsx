import { useState, useRef, useCallback } from "react";
import type { CompleteOrderButtonProps, Phase } from "./interfaces";
import { PHASES, ORDER, TIMINGS, shade, speedToMult } from "./utils";
import "./styles/index.css";

export type { CompleteOrderButtonProps } from "./interfaces";

export default function CompleteOrderButton({
  mode = "day",
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
  const [phase, setPhase] = useState<Phase>(PHASES.IDLE);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    if (phase !== PHASES.IDLE) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const mult = speedToMult(speed);
    let elapsed = 0;
    ORDER.forEach((p) => {
      timers.current.push(
        setTimeout(() => {
          setPhase(p);
          if (p === PHASES.DONE && typeof onComplete === "function") onComplete();
        }, elapsed)
      );
      elapsed += TIMINGS[p] * mult;
    });
    if (autoReset) {
      timers.current.push(setTimeout(() => setPhase(PHASES.IDLE), elapsed));
    }
  }, [phase, speed, onComplete, autoReset]);

  const animating = phase !== PHASES.IDLE && phase !== PHASES.DONE;
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
    <button
      className={`cob-btn cob-${phase} ${sceneActive ? "active" : ""} ${mode === "night" ? "cob-night" : ""}`}
      style={rootStyle as React.CSSProperties}
      onClick={run}
      disabled={animating}
      aria-label={label}
    >
      <span className={`cob-label ${phase === PHASES.IDLE ? "show" : ""}`}>
        {label}
      </span>

      <span className={`cob-done ${phase === PHASES.DONE ? "show" : ""}`}>
        <svg viewBox="0 0 24 24" className="cob-check" aria-hidden="true">
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

      <span className="cob-sky" aria-hidden="true">
        <span className="cob-sun" />
        <span className="cob-stars" />
        <span className="cob-cloud c1" />
        <span className="cob-cloud c2" />
        <svg className="cob-hills" viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,60 C60,50 118,55 180,49 C242,43 300,52 360,47 L360,68 L0,68 Z" fill="#c2e4c6" />
          <path d="M0,64 C52,53 96,52 142,58 C188,64 232,49 286,55 C322,59 346,60 360,56 L360,68 L0,68 Z" fill="#9bd183" />
          <path d="M0,66 C56,61 102,60 152,63 C206,66 246,57 300,61 C330,63 348,64 360,62 L360,70 L0,70 Z" fill="#7cbd65" />
        </svg>
        <span className="cob-tree t1"><i className="canopy" /><i className="trunk" /></span>
        <span className="cob-tree t2"><i className="canopy" /><i className="trunk" /></span>
        <span className="cob-tree t3"><i className="canopy" /><i className="trunk" /></span>
        <span className="cob-ground" />
        <span className="cob-road" />
      </span>

      <span
        className={`cob-truck ${showTruck ? "in" : ""} ${phase === PHASES.LEAVE ? "leave" : ""} ${lightsOn ? "lights" : ""} ${smokeOn ? "smoking" : ""}`}
      >
        <span className="cob-shadow" />
        <span className="cob-pipe" />
        <span className="cob-smoke"><i /> <i /> <i /></span>
        <span className="cob-cargo">
          <span className="cob-hold" />
          <span className={`cob-package ${pkgVisible ? "show" : ""} ${pkgLoading ? "loading" : ""} ${pkgGone ? "gone" : ""}`}>
            <span className="cob-tape-h" />
            <span className="cob-tape-v" />
            <span className="cob-flap" />
          </span>
          <span className="cob-body">
            <span className="cob-stripe" />
            <span className="cob-logo" />
            <span className="cob-seam" />
          </span>
          <span className={`cob-door ${doorsOpen ? "open" : ""}`}>
            <span className="cob-handle" />
          </span>
        </span>
        <span className="cob-cab">
          <span className="cob-window" />
          <span className="cob-grille" />
          <span className="cob-headlight" />
          <span className="cob-mirror" />
        </span>
        <span className="cob-bumper" />
        <span className="cob-beam" />
        <span className="cob-fender f1" />
        <span className="cob-fender f2" />
        <span className="cob-wheel w1"><i /></span>
        <span className="cob-wheel w2"><i /></span>
      </span>
    </button>
  );
}
