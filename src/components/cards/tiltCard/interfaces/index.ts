import type { ReactNode } from "react";

export interface TiltCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Max tilt in degrees (default 15) */
  maxTilt?: number;
  /** Glare overlay (default true) */
  glare?: boolean;
}
