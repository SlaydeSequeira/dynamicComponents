import type { ReactNode } from "react";

export interface SpotlightCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Spotlight radius in px (default 120) */
  spotlightSize?: number;
  /** Color of the spotlight glow (default "rgba(255,255,255,0.15)") */
  spotlightColor?: string;
}
