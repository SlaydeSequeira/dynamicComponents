import type { ReactNode } from "react";

export interface SlideToActionProps {
  label?: string;
  completedLabel?: string;
  accentColor?: string;
  /** Custom icon inside the knob. Defaults to a dotted arrow. */
  icon?: ReactNode;
  /** 0-1 threshold to trigger completion (default 0.8) */
  threshold?: number;
  onComplete?: () => void;
  autoReset?: boolean;
  /** Width in px (default 320) */
  width?: number;
  /** Height in px (default 80) */
  height?: number;
}
