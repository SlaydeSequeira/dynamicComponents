import type { ReactNode } from "react";

export interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  width?: number;
  height?: number;
  /** Flip direction (default "horizontal") */
  direction?: "horizontal" | "vertical";
  /** Trigger mode (default "hover") */
  trigger?: "hover" | "click";
}
