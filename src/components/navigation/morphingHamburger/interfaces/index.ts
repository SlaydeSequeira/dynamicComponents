export interface MorphingHamburgerProps {
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  size?: number;
  color?: string;
  /** Line thickness (default 3) */
  thickness?: number;
}
