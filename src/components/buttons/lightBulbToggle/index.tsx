import { useControllableState } from "../../shared/useControllableState";
import { useLightBulbPhysics } from "./hooks/useLightBulbPhysics";
import { PULL_IMPULSE, BASE_CORD_LENGTH, WIRE_HEIGHT } from "./utils";
import type { LightBulbToggleProps } from "./interfaces";
import "./styles/index.css";

export type { LightBulbToggleProps } from "./interfaces";

export default function LightBulbToggle({
  isOn: controlledOn,
  onChange,
  scale = 1,
}: LightBulbToggleProps) {
  const [isOn, setIsOn] = useControllableState({
    controlledValue: controlledOn,
    defaultValue: false,
    onChange,
  });

  const {
    shellRef,
    cordRef,
    hangingRef,
    toggle,
    startSpring,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useLightBulbPhysics({ isOn, setIsOn, scale });

  const vars = {
    "--lbt-scale": scale,
    "--lbt-wire-h": `${WIRE_HEIGHT * scale}px`,
    "--lbt-cap-w": `${28 * scale}px`,
    "--lbt-cap-h": `${20 * scale}px`,
    "--lbt-glass-w": `${58 * scale}px`,
    "--lbt-glass-h": `${72 * scale}px`,
    "--lbt-overlap": `${10 * scale}px`,
    "--lbt-cord-h": `${BASE_CORD_LENGTH * scale}px`,
    "--lbt-knob-w": `${14 * scale}px`,
    "--lbt-knob-h": `${20 * scale}px`,
  } as React.CSSProperties;

  return (
    <div className="lbt-shell" ref={shellRef} style={vars}>
      <div className="lbt-wire" />
      <div className="lbt-hanging" ref={hangingRef}>
        <div className="lbt-fixture">
          <div className="lbt-cap" />
          <div className={`lbt-glass ${isOn ? "lit" : ""}`}>
            <svg
              className="lbt-filament"
              viewBox="0 0 20 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="6" y1="28" x2="6" y2="12" />
              <line x1="14" y1="28" x2="14" y2="12" />
              <polyline points="6,12 8,8 10,12 12,8 14,12" />
            </svg>
          </div>
        </div>
        <div className="lbt-pull-area">
          <div className="lbt-cord" ref={cordRef} />
          <div
            className="lbt-knob"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="switch"
            aria-checked={isOn}
            aria-label="Toggle light"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                toggle();
                startSpring({
                  angle: 0,
                  stretch: 0,
                  angularVel: PULL_IMPULSE,
                  stretchVel: PULL_IMPULSE * 2,
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
