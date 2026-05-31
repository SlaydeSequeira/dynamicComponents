import type { ReactNode } from "react";

export interface HolographicCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Intensity of the holographic effect (default 0.5) */
  intensity?: number;
  /** Enable 3D tilt on hover (default true) */
  tilt?: boolean;
}
