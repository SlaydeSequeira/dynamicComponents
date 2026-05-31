import type { DnaHelixLoaderProps } from "./interfaces";
import {
  DEFAULT_SIZE,
  DEFAULT_PAIRS,
  DEFAULT_SPEED,
  DEFAULT_COLOR_A,
  DEFAULT_COLOR_B,
  DEFAULT_CONNECTOR,
} from "./utils";
import "./styles/index.css";

export type { DnaHelixLoaderProps } from "./interfaces";

export default function DnaHelixLoader({
  size = DEFAULT_SIZE,
  pairs = DEFAULT_PAIRS,
  colorA = DEFAULT_COLOR_A,
  colorB = DEFAULT_COLOR_B,
  connectorColor = DEFAULT_CONNECTOR,
  speed = DEFAULT_SPEED,
}: DnaHelixLoaderProps) {
  const count = Math.min(Math.max(pairs, 4), 16);
  const dotSize = Math.max(size * 0.07, 6);

  return (
    <div
      className="dna-container"
      style={
        {
          "--dna-size": `${size}px`,
          "--dna-speed": `${speed}s`,
          "--dna-color-a": colorA,
          "--dna-color-b": colorB,
          "--dna-connector": connectorColor,
          "--dna-dot-size": `${dotSize}px`,
        } as React.CSSProperties
      }
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }, (_, i) => {
        const yPercent = (i / (count - 1)) * 80 + 10;
        const delay = -(i / count) * speed;
        return (
          <div
            key={i}
            className="dna-pair"
            style={
              {
                top: `${yPercent}%`,
                "--dna-delay": `${delay}s`,
              } as React.CSSProperties
            }
          >
            <div className="dna-dot strand-a" />
            <div className="dna-connector" />
            <div className="dna-dot strand-b" />
          </div>
        );
      })}
    </div>
  );
}
