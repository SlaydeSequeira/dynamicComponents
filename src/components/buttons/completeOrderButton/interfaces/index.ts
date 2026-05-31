export type Phase =
  | "idle"
  | "reveal"
  | "driveIn"
  | "open"
  | "load"
  | "close"
  | "leave"
  | "done";

export type Mode = "day" | "night";

export interface CompleteOrderButtonProps {
  mode?: Mode;
  truckColor?: string;
  truckSecondaryColor?: string;
  boxColor?: string;
  shouldHeadlightComeOn?: boolean;
  shouldExhaustReleaseSmoke?: boolean;
  /** 1–100 (50 = default pace). Lower is slower, higher is faster. */
  speed?: number;
  label?: string;
  successLabel?: string;
  onComplete?: () => void;
  autoReset?: boolean;
}
