import { useRef, useEffect, useState } from "react";

export function useWebGPUSlider(
  color: [number, number, number],
  glowTint: [number, number, number],
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!navigator.gpu) {
      setSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const tgpu = await import("typegpu");
      const d = await import("typegpu/data");
      const { CanvasJellySlider } = await import("gooui");

      if (destroyed) return;

      const root = await tgpu.default.init();
      if (destroyed) { root.destroy(); return; }

      const slider = new CanvasJellySlider({
        root,
        jellyColor: d.vec3f(...color),
        glowTint: d.vec3f(...glowTint),
      });

      container.prepend(slider.canvas);

      cleanup = () => {
        slider.canvas.remove();
        root.destroy();
      };
    })();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return { containerRef, supported };
}
