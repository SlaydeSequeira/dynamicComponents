// Pot geometry constants
export const POT_BODY_PATH =
  "M-5,-14 C-8,-10 -12,-3 -12,3 Q-11,11 -6,14 Q0,17 6,14 Q11,11 12,3 C12,-3 8,-10 5,-14 Z";
export const POT_TRANSFORM = "translate(88,-30) rotate(-45) scale(2.5)";

// Mug geometry constants (in a 100x100 viewBox)
export const MUG_TOP = 28;
export const MUG_BOTTOM = 78;
export const MUG_HEIGHT = MUG_BOTTOM - MUG_TOP;
export const RIM_LEFT_X = 22;
export const RIM_RIGHT_X = 68;
export const BOT_LEFT_X = 28;
export const BOT_RIGHT_X = 62;

export function computeMugClipPath(): string {
  return `M${RIM_LEFT_X},${MUG_TOP} L${BOT_LEFT_X},${MUG_BOTTOM} Q${(BOT_LEFT_X + BOT_RIGHT_X) / 2},${MUG_BOTTOM + 5} ${BOT_RIGHT_X},${MUG_BOTTOM} L${RIM_RIGHT_X},${MUG_TOP} Z`;
}

export function computeLiquidGeometry(progress: number) {
  const liquidTop = MUG_BOTTOM - (progress / 100) * MUG_HEIGHT;
  const tLiq = (liquidTop - MUG_TOP) / MUG_HEIGHT;
  const liqLeftX = RIM_LEFT_X + (BOT_LEFT_X - RIM_LEFT_X) * tLiq;
  const liqRightX = RIM_RIGHT_X + (BOT_RIGHT_X - RIM_RIGHT_X) * tLiq;
  const potLiquidY = -48 + (progress / 100) * 53;
  const streamWidth = 3 - (progress / 100) * 2.2;
  const streamOpacity = 1 - (progress / 100) * 0.6;

  return { liquidTop, liqLeftX, liqRightX, potLiquidY, streamWidth, streamOpacity };
}

export function computeLiquidPath(
  progress: number,
  liquidTop: number,
  liqLeftX: number,
  liqRightX: number,
): string {
  if (progress <= 0) return "";
  return `M${liqLeftX},${liquidTop}
            Q${(liqLeftX + liqRightX) / 2},${liquidTop + 2} ${liqRightX},${liquidTop}
            L${BOT_RIGHT_X},${MUG_BOTTOM}
            Q${(BOT_LEFT_X + BOT_RIGHT_X) / 2},${MUG_BOTTOM + 4} ${BOT_LEFT_X},${MUG_BOTTOM}
            Z`;
}

export function computeFoamPath(
  progress: number,
  liquidTop: number,
  liqLeftX: number,
  liqRightX: number,
): string {
  if (progress < 20) return "";
  const foamY = liquidTop;
  return `M${liqLeftX},${foamY}
            Q${(liqLeftX + liqRightX) / 2},${foamY - 1.5} ${liqRightX},${foamY}
            Q${(liqLeftX + liqRightX) / 2},${foamY + 3} ${liqLeftX},${foamY}
            Z`;
}
