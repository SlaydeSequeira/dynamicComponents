import { useState, useCallback } from "react";
import type { DayNightToggleProps } from "./interfaces";
import { BASE_WIDTH, BASE_HEIGHT, KNOB_SIZE, KNOB_PAD } from "./utils";
import "./styles/index.css";

export type { DayNightToggleProps } from "./interfaces";

export default function DayNightToggle({
  isNight: controlledNight,
  onChange,
  scale = 1,
}: DayNightToggleProps) {
  const [internalNight, setInternalNight] = useState(false);
  const isControlled = controlledNight !== undefined;
  const isNight = isControlled ? controlledNight : internalNight;

  const toggle = useCallback(() => {
    const next = !isNight;
    if (!isControlled) setInternalNight(next);
    onChange?.(next);
  }, [isNight, isControlled, onChange]);

  const vars = {
    "--dnt-w": `${BASE_WIDTH * scale}px`,
    "--dnt-h": `${BASE_HEIGHT * scale}px`,
    "--dnt-knob": `${KNOB_SIZE * scale}px`,
    "--dnt-pad": `${KNOB_PAD * scale}px`,
    "--dnt-slide": `${(BASE_WIDTH - KNOB_SIZE - KNOB_PAD * 2) * scale}px`,
  } as React.CSSProperties;

  return (
    <div
      className={`dnt-shell ${isNight ? "night" : ""}`}
      style={vars}
      onClick={toggle}
      role="switch"
      aria-checked={isNight}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="dnt-track" />

      <div className="dnt-clouds">
        <span className="dnt-cloud c1" />
        <span className="dnt-cloud c2" />
      </div>

      <div className="dnt-stars">
        <span className="dnt-star s1 shaped" style={{ "--star-o": 0.9 } as React.CSSProperties} />
        <span className="dnt-star s2" style={{ "--star-o": 0.7 } as React.CSSProperties} />
        <span className="dnt-star s3 shaped" style={{ "--star-o": 0.8 } as React.CSSProperties} />
        <span className="dnt-star s4" style={{ "--star-o": 0.6 } as React.CSSProperties} />
        <span className="dnt-star s5" style={{ "--star-o": 0.5 } as React.CSSProperties} />
        <span className="dnt-star s6" style={{ "--star-o": 0.7 } as React.CSSProperties} />
        <span className="dnt-star s7" style={{ "--star-o": 0.6 } as React.CSSProperties} />
        <span className="dnt-star s8" style={{ "--star-o": 0.8 } as React.CSSProperties} />
        <span className="dnt-star s9 shaped" style={{ "--star-o": 0.5 } as React.CSSProperties} />
      </div>

      <div className="dnt-knob-wrap">
        <span className="dnt-knob-shadow" />
        <span className="dnt-sun" />
        <span className="dnt-moon">
          <span className="dnt-crater cr1" />
          <span className="dnt-crater cr2" />
          <span className="dnt-crater cr3" />
        </span>
      </div>
    </div>
  );
}
