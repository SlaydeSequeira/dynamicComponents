import type { CSSProperties, ReactNode } from "react";

export type GlassCardVariant = "light" | "dark";

export interface GlassCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Backdrop blur in px (default 16) */
  blur?: number;
  /** Surface opacity 0–1 (default 0.18) */
  opacity?: number;
  borderRadius?: number;
  padding?: number;
  variant?: GlassCardVariant;
  className?: string;
  style?: CSSProperties;
}
