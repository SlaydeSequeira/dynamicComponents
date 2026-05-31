export interface DayNightToggleProps {
  isNight?: boolean;
  onChange?: (isNight: boolean) => void;
  /** Scale multiplier — 1 = 140×64px (default) */
  scale?: number;
}
