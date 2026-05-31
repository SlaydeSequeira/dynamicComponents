import type { Strength } from "../interfaces";

export const DEFAULT_WIDTH = 300;

export function getStrength(pw: string): Strength {
  if (!pw) return "empty";
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 1) return "weak";
  if (score <= 2) return "fair";
  if (score <= 3) return "good";
  return "strong";
}

export const STRENGTH_CONFIG: Record<Strength, { label: string; color: string; pct: number }> = {
  empty: { label: "", color: "transparent", pct: 0 },
  weak: { label: "Weak", color: "#e74c3c", pct: 25 },
  fair: { label: "Fair", color: "#e67e22", pct: 50 },
  good: { label: "Good", color: "#f1c40f", pct: 75 },
  strong: { label: "Strong", color: "#27ae60", pct: 100 },
};
