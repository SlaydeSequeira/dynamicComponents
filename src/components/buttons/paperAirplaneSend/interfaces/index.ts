export type Phase = "idle" | "fold" | "fly" | "done";

export interface PaperAirplaneSendProps {
  label?: string;
  successLabel?: string;
  color?: string;
  planeColor?: string;
  /** 1–100 (50 = default pace). Lower is slower, higher is faster. */
  speed?: number;
  onSend?: () => void;
  autoReset?: boolean;
  disabled?: boolean;
}
