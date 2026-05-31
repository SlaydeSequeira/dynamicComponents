import type { ReactNode } from "react";

export interface ScratchCardProps {
  children?: ReactNode;
  width?: number;
  height?: number;
  /** Scratch overlay color (default "#888") */
  overlayColor?: string;
  /** Hint text drawn on the overlay (default "Scratch here!") */
  outerText?: string;
  /** Revealed content background (default "#065f46") */
  internalColor?: string;
  /** Text shown underneath the overlay (default "You won $50!") */
  innerText?: string;
  /** Brush radius (default 25) */
  brushSize?: number;
  /** % scratched to auto-reveal (default 50) */
  revealAt?: number;
  onReveal?: () => void;
}
