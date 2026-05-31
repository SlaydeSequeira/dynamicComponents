import { useCallback, useState } from "react";
import type { HolographicCardProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_INTENSITY } from "./utils";
import { useMouseTilt } from "../../shared/useMouseTilt";
import "./styles/index.css";

export type { HolographicCardProps } from "./interfaces";

export default function HolographicCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  intensity = DEFAULT_INTENSITY,
  tilt = true,
}: HolographicCardProps) {
  const { ref, style: tiltStyle, handlers, getNormalized } = useMouseTilt({ maxTilt: tilt ? 10 : 0 });
  const [holoStyle, setHoloStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      handlers.onMouseMove(e);
      const pos = getNormalized(e);
      if (!pos) return;
      const angle = Math.atan2(pos.y - 0.5, pos.x - 0.5) * (180 / Math.PI) + 90;
      setHoloStyle({
        "--hc-mx": `${pos.x * 100}%`,
        "--hc-my": `${pos.y * 100}%`,
        "--hc-angle": `${angle}deg`,
      } as React.CSSProperties);
    },
    [handlers, getNormalized]
  );

  const handleLeave = useCallback(() => {
    handlers.onMouseLeave();
    setHoloStyle({
      "--hc-mx": "50%",
      "--hc-my": "50%",
      "--hc-angle": "135deg",
    } as React.CSSProperties);
  }, [handlers]);

  const handleEnter = useCallback(() => {
    handlers.onMouseEnter();
  }, [handlers]);

  const vars = {
    "--hc-w": `${width}px`,
    "--hc-h": `${height}px`,
    "--hc-intensity": intensity,
  } as React.CSSProperties;

  return (
    <div className="hc-wrap" style={vars}>
      <div
        ref={ref}
        className="hc-card"
        style={{ ...tiltStyle, ...holoStyle }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
      >
        <div className="hc-content">{children}</div>
        <div className="hc-holo" aria-hidden="true" />
        <div className="hc-shimmer" aria-hidden="true" />
        <div className="hc-sparkle" aria-hidden="true" />
        <div className="hc-edge" aria-hidden="true" />
      </div>
    </div>
  );
}
