export interface LightBulbToggleProps {
  isOn?: boolean;
  onChange?: (isOn: boolean) => void;
  /** Scale multiplier — 1 = default size */
  scale?: number;
}
