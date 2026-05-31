export type Character =
  | "snail"
  | "car"
  | "truck"
  | "rocket"
  | "bicycle"
  | "runner"
  | "caterpillar"
  | "train";

export interface ScrollProgressBarProps {
  character?: Character;
  /** 0–100 controlled progress. If omitted, tracks window scroll position. */
  progress?: number;
  trackColor?: string;
  progressColor?: string;
  characterColor?: string;
  /** Track height in px */
  height?: number;
  /** Character-specific trail effect on the progress fill */
  showTrail?: boolean;
  showPercentage?: boolean;
  onProgress?: (progress: number) => void;
}
