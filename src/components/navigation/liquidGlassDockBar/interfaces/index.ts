import type { ReactNode } from "react";

export interface DockItem {
  /** Stable key; falls back to the array index */
  id?: string;
  /** Tooltip text + accessible label */
  label: string;
  /** Emoji, glyph, or SVG node rendered inside the tile */
  icon: ReactNode;
  /** Shows the active indicator dot below the tile */
  active?: boolean;
  /** Per-item click handler */
  onClick?: () => void;
}

export interface LiquidGlassDockBarProps {
  items: DockItem[];
  /** Resting icon size in px (default 48) */
  baseSize?: number;
  /** Magnified size at the cursor in px (default 84) */
  maxSize?: number;
  /** Cursor influence radius in px — wider = more neighbours grow (default 160) */
  magnification?: number;
  /** Gap between icons in px (default 12) */
  gap?: number;
  /** Show label tooltips on hover/focus (default true) */
  showLabels?: boolean;
  /** Bounce the icon on click (default true) */
  bounce?: boolean;
  /** Apple-style liquid-glass material: edge refraction, specular glare & rim (default true) */
  liquidGlass?: boolean;
  /** Accent color for the active dot and focus ring (default "#7cb3f5") */
  accent?: string;
  /** Fires when any item is clicked */
  onItemClick?: (item: DockItem, index: number) => void;
}
