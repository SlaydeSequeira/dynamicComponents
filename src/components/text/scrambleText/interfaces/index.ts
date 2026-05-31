export interface ScrambleTextProps {
  text: string;
  /** Trigger scramble on hover (default "hover") */
  trigger?: "hover" | "click" | "auto";
  /** Scramble speed in ms per character (default 50) */
  speed?: number;
  /** Characters to use for scrambling */
  charset?: string;
  /** Text color (default "#fff") */
  color?: string;
  /** Font size in px (default 24) */
  fontSize?: number;
}
