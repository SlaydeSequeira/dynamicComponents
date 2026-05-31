import type { OrbitalLoaderProps } from "./interfaces";
import { DEFAULT_SIZE, ORBITAL_COLORS } from "./utils";
import "./styles/index.css";

export type { OrbitalLoaderProps } from "./interfaces";

export default function OrbitalLoader({
  size = DEFAULT_SIZE,
  coreColor = "#7cb3f5",
  orbitals = 3,
  speed = 2,
}: OrbitalLoaderProps) {
  const count = Math.min(Math.max(orbitals, 1), 8);

  return (
    <div
      className="ol-container"
      style={{ "--ol-size": `${size}px`, "--ol-core": coreColor } as React.CSSProperties}
      role="status"
      aria-label="Loading"
    >
      <div className="ol-core" />
      {Array.from({ length: count }, (_, i) => {
        const scale = 0.55 + i * 0.18;
        const dur = speed + i * 0.6;
        const direction = i % 2 === 0 ? "normal" : "reverse";
        const color = ORBITAL_COLORS[i % ORBITAL_COLORS.length];
        return (
          <div
            key={i}
            className="ol-ring"
            style={{
              "--ol-speed": `${dur}s`,
              inset: `${(1 - scale) * 50}%`,
              animationDirection: direction,
              animationDelay: `${i * -0.3}s`,
            } as React.CSSProperties}
          >
            <div className="ol-dot" style={{ "--ol-dot-color": color } as React.CSSProperties} />
          </div>
        );
      })}
    </div>
  );
}
