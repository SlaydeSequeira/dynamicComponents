export const DEFAULT_WIDTH = 300;
export const DEFAULT_HEIGHT = 180;
export const DEFAULT_OVERLAY_COLOR = "#888";
export const DEFAULT_OUTER_TEXT = "Scratch here!";
export const DEFAULT_INNER_TEXT = "You won $50!";
export const DEFAULT_INTERNAL_COLOR = "#065f46";

export function calcScratchPercent(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  const data = ctx.getImageData(0, 0, w, h).data;
  let clear = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] === 0) clear++;
  }
  return (clear / (w * h)) * 100;
}
