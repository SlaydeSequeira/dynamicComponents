import { useRef, useCallback, useState } from "react";
import type { TiltCardProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MAX_TILT } from "./utils";
import "./styles/index.css";

export type { TiltCardProps } from "./interfaces";

export default function TiltCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  maxTilt = DEFAULT_MAX_TILT,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - y) * maxTilt * 2;
      const rotY = (x - 0.5) * maxTilt * 2;

      setStyle({ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` });

      if (glare) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
        setGlareStyle({
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        });
      }
    },
    [maxTilt, glare]
  );

  const handleLeave = useCallback(() => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)", transition: "transform 0.5s ease" });
    setGlareStyle({});
  }, []);

  const handleEnter = useCallback(() => {
    setStyle((s) => ({ ...s, transition: "none" }));
  }, []);

  return (
    <div className="tc-wrap" style={{ "--tc-w": `${width}px`, "--tc-h": `${height}px` } as React.CSSProperties}>
      <div
        ref={cardRef}
        className="tc-card"
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
      >
        {children}
        {glare && <div className="tc-glare" style={glareStyle} />}
      </div>
    </div>
  );
}
