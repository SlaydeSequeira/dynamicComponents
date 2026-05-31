import { useState } from "react";
import type { FlipCardProps } from "./interfaces";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "./utils";
import "./styles/index.css";

export type { FlipCardProps } from "./interfaces";

export default function FlipCard({
  front,
  back,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  direction = "horizontal",
  trigger = "hover",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const vars = {
    "--fc-w": `${width}px`,
    "--fc-h": `${height}px`,
  } as React.CSSProperties;

  const containerProps =
    trigger === "hover"
      ? { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) }
      : { onClick: () => setFlipped((f) => !f) };

  return (
    <div
      className={`fc-container ${flipped ? "flipped" : ""} ${direction === "vertical" ? "vertical" : ""}`}
      style={vars}
      {...containerProps}
    >
      <div className="fc-inner">
        <div className="fc-front">{front}</div>
        <div className="fc-back">{back}</div>
      </div>
    </div>
  );
}
