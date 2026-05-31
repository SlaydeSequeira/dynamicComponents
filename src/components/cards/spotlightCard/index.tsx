import { useRef, useCallback, useState } from "react";
import type { SpotlightCardProps } from "./interfaces";
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_SPOTLIGHT_SIZE,
  DEFAULT_SPOTLIGHT_COLOR,
} from "./utils";
import "./styles/index.css";

export type { SpotlightCardProps } from "./interfaces";

export default function SpotlightCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  spotlightSize = DEFAULT_SPOTLIGHT_SIZE,
  spotlightColor = DEFAULT_SPOTLIGHT_COLOR,
}: SpotlightCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        "--slc-mx": `${e.clientX - rect.left}px`,
        "--slc-my": `${e.clientY - rect.top}px`,
      } as React.CSSProperties);
    },
    []
  );

  const handleLeave = useCallback(() => {
    setPos({
      "--slc-mx": "-999px",
      "--slc-my": "-999px",
    } as React.CSSProperties);
  }, []);

  const vars = {
    "--slc-w": `${width}px`,
    "--slc-h": `${height}px`,
    "--slc-radius": `${spotlightSize}px`,
    "--slc-color": spotlightColor,
    ...pos,
  } as React.CSSProperties;

  return (
    <div
      ref={wrapRef}
      className="slc-wrap"
      style={vars}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="slc-dim" aria-hidden="true">{children}</div>
      <div className="slc-content">{children}</div>
      <div className="slc-glow" aria-hidden="true" />
      <div className="slc-border" aria-hidden="true" />
      <div className="slc-hint">Hover to reveal</div>
    </div>
  );
}
