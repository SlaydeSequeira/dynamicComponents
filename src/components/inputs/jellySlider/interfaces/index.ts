export interface JellySliderProps {
  /** 0-1 controlled value */
  value?: number;
  onChange?: (value: number) => void;
  /** Jelly body color as [r, g, b] 0-1 range (default [0.2, 0.6, 1.0]) */
  color?: [number, number, number];
  /** Glow tint as [r, g, b] 0-1 range (default [0.1, 0.5, 1.0]) */
  glowTint?: [number, number, number];
  /** Width in px (default 400) */
  width?: number;
  /** Height in px (default 200) */
  height?: number;
  /** Show percentage label (default true) */
  showPercentage?: boolean;
}
