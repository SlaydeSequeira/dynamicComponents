export interface DnaHelixLoaderProps {
  /** Overall width in px (default 120) */
  size?: number;
  /** Number of dot pairs per strand (default 10) */
  pairs?: number;
  /** Strand A color (default "#7cb3f5") */
  colorA?: string;
  /** Strand B color (default "#f5a623") */
  colorB?: string;
  /** Connector bar color (default "rgba(255,255,255,0.15)") */
  connectorColor?: string;
  /** Speed — seconds for a full cycle (default 2.5) */
  speed?: number;
}
