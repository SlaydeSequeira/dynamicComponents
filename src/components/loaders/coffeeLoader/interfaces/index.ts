export interface CoffeeLoaderProps {
  size?: number;
  /** 0-100 progress (default animates automatically) */
  progress?: number;
  color?: string;
  /** Show the progress percentage text (default false) */
  showPercentage?: boolean;
  /** Show a coffee pot pouring into the mug (default false) */
  showPot?: boolean;
  /** Animate the liquid with a gentle sloshing wave (default false) */
  fluid?: boolean;
}
