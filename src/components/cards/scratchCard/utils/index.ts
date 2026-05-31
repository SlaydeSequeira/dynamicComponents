export const DEFAULT_WIDTH = 300;
export const DEFAULT_HEIGHT = 180;

export function calcScratchPercent(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  const data = ctx.getImageData(0, 0, w, h).data;
  let clear = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] === 0) clear++;
  }
  return (clear / (w * h)) * 100;
}
