import { useCallback, useState } from "react";
import type { TiltCardProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MAX_TILT } from "./utils";
import { useMouseTilt } from "../../shared/useMouseTilt";
import "./styles/index.css";

export type { TiltCardProps } from "./interfaces";

export default function TiltCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  maxTilt = DEFAULT_MAX_TILT,
  glare = true,
}: TiltCardProps) {
  const { ref, style, handlers, getNormalized } = useMouseTilt({ maxTilt });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      handlers.onMouseMove(e);
      if (glare) {
        const pos = getNormalized(e);
        if (!pos) return;
        const angle = Math.atan2(pos.y - 0.5, pos.x - 0.5) * (180 / Math.PI) + 90;
        setGlareStyle({
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        });
      }
    },
    [handlers, glare, getNormalized]
  );

  const handleLeave = useCallback(() => {
    handlers.onMouseLeave();
    setGlareStyle({});
  }, [handlers]);

  return (
    <div className="tc-wrap" style={{ "--tc-w": `${width}px`, "--tc-h": `${height}px` } as React.CSSProperties}>
      <div
        ref={ref}
        className="tc-card"
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handlers.onMouseEnter}
      >
        {children}
        {glare && <div className="tc-glare" style={glareStyle} />}
      </div>
    </div>
  );
}
