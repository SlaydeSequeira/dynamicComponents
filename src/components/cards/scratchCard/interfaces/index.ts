import type { ReactNode } from "react";

export interface ScratchCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Overlay color (default "#888") */
  overlayColor?: string;
  /** Brush radius (default 25) */
  brushSize?: number;
  /** % scratched to auto-reveal (default 50) */
  revealAt?: number;
  onReveal?: () => void;
  /** Show scratch percentage indicator (default false) */
  showPercentage?: boolean;
}
