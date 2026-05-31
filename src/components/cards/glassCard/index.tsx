import type { CSSProperties } from "react";
import type { GlassCardProps } from "./interfaces";
import {
  DEFAULT_BLUR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_HEIGHT,
  DEFAULT_OPACITY,
  DEFAULT_PADDING,
  DEFAULT_WIDTH,
} from "./utils";
import "./styles/index.css";

export type { GlassCardProps, GlassCardVariant } from "./interfaces";

const GlassCard = ({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  blur = DEFAULT_BLUR,
  opacity = DEFAULT_OPACITY,
  borderRadius = DEFAULT_BORDER_RADIUS,
  padding = DEFAULT_PADDING,
  variant = "light",
  className = "",
  style,
}: GlassCardProps) => {
  const vars = {
    "--glc-w": `${width}px`,
    "--glc-h": `${height}px`,
    "--glc-blur": `${blur}px`,
    "--glc-opacity": opacity,
    "--glc-radius": `${borderRadius}px`,
    "--glc-padding": `${padding}px`,
  } as CSSProperties;

  const classes = ["glc-card", `glc-${variant}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={{ ...vars, ...style }}>
      <div className="glc-shine" aria-hidden="true" />
      <div className="glc-edge" aria-hidden="true" />
      <div className="glc-content">{children}</div>
    </div>
  );
};

export default GlassCard;
