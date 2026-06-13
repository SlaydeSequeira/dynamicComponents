import { useCallback, useId, useState } from "react";
import type { LiquidGlassDockBarProps } from "./interfaces";
import {
  DEFAULT_BASE_SIZE,
  DEFAULT_GAP,
  DEFAULT_MAGNIFICATION,
  DEFAULT_MAX_SIZE,
} from "./utils";
import { useDockMagnify } from "./hooks/useDockMagnify";
import "./styles/index.css";

export type { LiquidGlassDockBarProps, DockItem } from "./interfaces";

export default function LiquidGlassDockBar({
  items,
  baseSize = DEFAULT_BASE_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  gap = DEFAULT_GAP,
  showLabels = true,
  bounce = true,
  liquidGlass = true,
  accent = "#7cb3f5",
  onItemClick,
}: LiquidGlassDockBarProps) {
  const reducedMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const { containerRef, registerItem, handlers } = useDockMagnify({
    base: baseSize,
    max: maxSize,
    radius: magnification,
    disabled: reducedMotion,
  });

  const [bouncing, setBouncing] = useState<number | null>(null);

  // Unique, CSS-safe id so multiple docks don't share one SVG filter.
  const filterId = `dock-glass-${useId().replace(/:/g, "")}`;

  const handleClick = useCallback(
    (index: number) => {
      const item = items[index];
      if (bounce && !reducedMotion) setBouncing(index);
      item.onClick?.();
      onItemClick?.(item, index);
    },
    [items, bounce, reducedMotion, onItemClick]
  );

  // Drive the cursor-following specular glare imperatively (no re-renders).
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      handlers.onPointerMove(e);
      const panel = containerRef.current;
      if (liquidGlass && panel) {
        const rect = panel.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        panel.style.setProperty("--dock-glare-x", `${x}%`);
      }
    },
    [handlers, liquidGlass, containerRef]
  );

  const vars = {
    "--dock-base": `${baseSize}px`,
    "--dock-max": `${maxSize}px`,
    "--dock-gap": `${gap}px`,
    "--dock-accent": accent,
  } as React.CSSProperties;

  return (
    <div className="dock-root" style={vars}>
      {liquidGlass && (
        <svg className="dock-glass-defs" aria-hidden="true" width="0" height="0">
          <filter
            id={filterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.013"
              numOctaves={2}
              seed={11}
              result="noise"
            >
              {!reducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="16s"
                  keyTimes="0;0.5;1"
                  values="0.009 0.013;0.013 0.009;0.009 0.013"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation="1.1" result="soft" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="soft"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div
        ref={containerRef}
        className={`dock-panel${liquidGlass ? " liquid" : ""}`}
        style={
          liquidGlass
            ? ({ "--dock-filter": `url(#${filterId})` } as React.CSSProperties)
            : undefined
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={handlers.onPointerLeave}
      >
        {liquidGlass && <span className="dock-refract" aria-hidden="true" />}
        {liquidGlass && <span className="dock-shine" aria-hidden="true" />}
        {liquidGlass && <span className="dock-edge" aria-hidden="true" />}

        {items.map((item, i) => (
          <button
            key={item.id ?? i}
            ref={registerItem(i)}
            className={`dock-item${item.active ? " active" : ""}${
              bouncing === i ? " bouncing" : ""
            }`}
            style={{ "--dock-size": `${baseSize}px` } as React.CSSProperties}
            aria-label={item.label}
            aria-current={item.active ? "page" : undefined}
            onClick={() => handleClick(i)}
            onAnimationEnd={() => setBouncing((b) => (b === i ? null : b))}
          >
            {showLabels && <span className="dock-label">{item.label}</span>}
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-dot" />
          </button>
        ))}
      </div>
    </div>
  );
}
