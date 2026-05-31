export const DEFAULT_WIDTH = 280;

interface ColorStop { t: number; r: number; g: number; b: number }

const COLOR_STOPS: ColorStop[] = [
  { t: 0,    r: 231, g: 76,  b: 60  },
  { t: 0.25, r: 230, g: 126, b: 34  },
  { t: 0.5,  r: 241, g: 196, b: 15  },
  { t: 0.75, r: 46,  g: 204, b: 113 },
  { t: 1,    r: 39,  g: 174, b: 96  },
];

function lerpColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < COLOR_STOPS.length - 2 && COLOR_STOPS[i + 1].t < clamped) i++;
  const a = COLOR_STOPS[i];
  const b = COLOR_STOPS[i + 1];
  const local = (clamped - a.t) / (b.t - a.t);
  const r = Math.round(a.r + (b.r - a.r) * local);
  const g = Math.round(a.g + (b.g - a.g) * local);
  const bl = Math.round(a.b + (b.b - a.b) * local);
  return `rgb(${r},${g},${bl})`;
}

export interface FaceData {
  mouthY1: number;
  mouthCtrlY: number;
  mouthY2: number;
  eyeRx: number;
  eyeRy: number;
  color: string;
  label: string;
}

const LABELS: { t: number; label: string }[] = [
  { t: 0,    label: "Terrible" },
  { t: 0.2,  label: "Bad" },
  { t: 0.4,  label: "Meh" },
  { t: 0.5,  label: "Okay" },
  { t: 0.65, label: "Good" },
  { t: 0.8,  label: "Great" },
  { t: 1,    label: "Excellent" },
];

function getLabel(t: number): string {
  for (let i = LABELS.length - 1; i >= 0; i--) {
    if (t >= LABELS[i].t) return LABELS[i].label;
  }
  return LABELS[0].label;
}

export function getFace(t: number): FaceData {
  const clamped = Math.max(0, Math.min(1, t));

  // mouth: frown (ctrl above endpoints) → straight → smile (ctrl below)
  // endpoints stay at y=20, control point goes from 14 (deep frown) to 27 (big smile)
  const mouthCtrlY = 14 + clamped * 13;

  // eyes get slightly rounder when happy
  const eyeRx = 2;
  const eyeRy = 2.2 + clamped * 0.5;

  return {
    mouthY1: 20,
    mouthCtrlY,
    mouthY2: 20,
    eyeRx,
    eyeRy,
    color: lerpColor(clamped),
    label: getLabel(clamped),
  };
}
