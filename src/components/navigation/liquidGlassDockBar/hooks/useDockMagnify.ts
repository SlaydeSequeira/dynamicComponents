import { useCallback, useEffect, useMemo, useRef } from "react";
import { magnifiedSize, SMOOTHING } from "../utils";

interface DockMagnifyConfig {
  base: number;
  max: number;
  radius: number;
  /** When true, magnification is skipped (e.g. reduced motion) */
  disabled?: boolean;
}

/**
 * Drives dock magnification imperatively. On each animation frame every tile's
 * live center is measured against the cursor's x position and its target size
 * is lerped in, then written straight to the element's `--dock-size` custom
 * property — no per-frame React renders. Because the tiles are flex-laid-out,
 * growing one reflows its neighbours apart, producing the classic dock push.
 */
export function useDockMagnify({ base, max, radius, disabled = false }: DockMagnifyConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<number, HTMLElement>>(new Map());
  const sizesRef = useRef<Map<number, number>>(new Map());
  const mouseXRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Keep latest config visible to the long-lived rAF closure without recreating it.
  const cfgRef = useRef({ base, max, radius });
  cfgRef.current = { base, max, radius };

  const tick = useCallback(() => {
    const mouseX = mouseXRef.current;
    const { base: b, max: m, radius: r } = cfgRef.current;
    const entries = Array.from(itemsRef.current.entries());

    // Read all centers first, then write all sizes — avoids layout thrashing.
    const centers = entries.map(([, el]) => {
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });

    let busy = false;
    entries.forEach(([index, el], k) => {
      const target =
        mouseX == null ? b : magnifiedSize(Math.abs(mouseX - centers[k]), r, b, m);
      const current = sizesRef.current.get(index) ?? b;
      const next = current + (target - current) * SMOOTHING;
      sizesRef.current.set(index, next);
      el.style.setProperty("--dock-size", `${next.toFixed(2)}px`);
      if (Math.abs(next - target) > 0.2) busy = true;
    });

    // Keep looping while the cursor is over the dock or tiles are still settling.
    if (busy || mouseX != null) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const registerItem = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      if (el) itemsRef.current.set(index, el);
      else {
        itemsRef.current.delete(index);
        sizesRef.current.delete(index);
      }
    },
    []
  );

  const handlers = useMemo(
    () => ({
      onPointerMove: (e: React.PointerEvent) => {
        if (disabled) return;
        mouseXRef.current = e.clientX;
        ensureLoop();
      },
      onPointerLeave: () => {
        if (disabled) return;
        mouseXRef.current = null;
        ensureLoop();
      },
    }),
    [disabled, ensureLoop]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { containerRef, registerItem, handlers };
}
