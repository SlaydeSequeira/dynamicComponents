import { useRef, useCallback, useState } from "react";
import type { HolographicCardProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_INTENSITY } from "./utils";
import "./styles/index.css";

export type { HolographicCardProps } from "./interfaces";

export default function HolographicCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  intensity = DEFAULT_INTENSITY,
  tilt = true,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
      const rotX = tilt ? (0.5 - y) * 20 : 0;
      const rotY = tilt ? (x - 0.5) * 20 : 0;

      setStyle({
        "--hc-mx": `${x * 100}%`,
        "--hc-my": `${y * 100}%`,
        "--hc-angle": `${angle}deg`,
        transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      } as React.CSSProperties);
    },
    [tilt]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      "--hc-mx": "50%",
      "--hc-my": "50%",
      "--hc-angle": "135deg",
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s ease",
    } as React.CSSProperties);
  }, []);

  const handleEnter = useCallback(() => {
    setStyle((s) => ({ ...s, transition: "none" }));
  }, []);

  const vars = {
    "--hc-w": `${width}px`,
    "--hc-h": `${height}px`,
    "--hc-intensity": intensity,
  } as React.CSSProperties;

  return (
    <div className="hc-wrap" style={vars}>
      <div
        ref={cardRef}
        className="hc-card"
        style={style}
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
