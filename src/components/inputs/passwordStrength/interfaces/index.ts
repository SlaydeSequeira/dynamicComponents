export interface PasswordStrengthProps {
  value?: string;
  onChange?: (value: string) => void;
  width?: number;
  placeholder?: string;
}

export type Strength = "empty" | "weak" | "fair" | "good" | "strong";
