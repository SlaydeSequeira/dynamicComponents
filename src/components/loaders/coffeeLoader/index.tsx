import { useMemo } from "react";
import type { CoffeeLoaderProps } from "./interfaces";
import { DEFAULT_SIZE } from "./utils";
import { useAutoProgress } from "./hooks/useAutoProgress";
import {
  POT_BODY_PATH,
  POT_TRANSFORM,
  MUG_TOP,
  MUG_BOTTOM,
  RIM_LEFT_X,
  RIM_RIGHT_X,
  BOT_LEFT_X,
  BOT_RIGHT_X,
  computeMugClipPath,
  computeLiquidGeometry,
  computeLiquidPath,
  computeFoamPath,
} from "./logic/geometry";
import "./styles/index.css";

export type { CoffeeLoaderProps } from "./interfaces";

export default function CoffeeLoader({
  size = DEFAULT_SIZE,
  progress: controlledProgress,
  color = "#6f4e37",
  showPercentage = false,
  showPot = false,
  fluid = false,
}: CoffeeLoaderProps) {
  const progress = useAutoProgress(controlledProgress);
  const showSteam = progress > 50;

  const { liquidTop, liqLeftX, liqRightX, potLiquidY, streamWidth, streamOpacity } =
    computeLiquidGeometry(progress);

  const streamVisible = showPot && progress > 0 && progress < 97;
  const mugClipPath = computeMugClipPath();

  const liquidPath = useMemo(
    () => computeLiquidPath(progress, liquidTop, liqLeftX, liqRightX),
    [progress, liquidTop, liqLeftX, liqRightX],
  );

  const foamPath = useMemo(
    () => computeFoamPath(progress, liquidTop, liqLeftX, liqRightX),
    [progress, liquidTop, liqLeftX, liqRightX],
  );

  return (
    <div
      className="cf-container"
      style={{
        "--cf-size": `${size}px`,
        ...(showPot && { "--cf-height": `${Math.round(size * 1.36)}px` }),
      } as React.CSSProperties}
      role="status"
      aria-label="Loading"
    >
      <svg viewBox={showPot ? "0 -70 125 170" : "0 0 100 100"}>
        <defs>
          <linearGradient id="cf-mug-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5f0ea" />
            <stop offset="30%" stopColor="#ede6dc" />
            <stop offset="70%" stopColor="#e0d6c8" />
            <stop offset="100%" stopColor="#d5c9b8" />
          </linearGradient>
          <linearGradient id="cf-mug-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3028" />
            <stop offset="100%" stopColor="#2a2018" />
          </linearGradient>
          <linearGradient id="cf-saucer-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ede6dc" />
            <stop offset="100%" stopColor="#d5c9b8" />
          </linearGradient>
          <linearGradient id="cf-liquid-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.85" />
          </linearGradient>
          <clipPath id="cf-mug-clip">
            <path d={mugClipPath} />
          </clipPath>
          {showPot && (
            <clipPath id="cf-pot-clip">
              <path d={POT_BODY_PATH} transform={POT_TRANSFORM} />
            </clipPath>
          )}
        </defs>

        {/* Saucer */}
        <ellipse cx="45" cy="86" rx="34" ry="6" fill="url(#cf-saucer-grad)" />
        <ellipse cx="45" cy="84" rx="30" ry="4.5" fill="#e8e0d4" />
        <ellipse cx="45" cy="84" rx="24" ry="3" fill="#ddd4c6" />

        {/* Mug shadow on saucer */}
        <ellipse cx="45" cy="82" rx="18" ry="2.5" fill="rgba(0,0,0,0.08)" />

        {/* Handle — behind the mug body */}
        <path
          d="M66,38 C82,38 84,52 84,56 C84,62 80,68 68,68"
          fill="none"
          stroke="url(#cf-mug-grad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Handle inner edge */}
        <path
          d="M68,42 C78,42 79,52 79,55 C79,60 76,64 68,64"
          fill="none"
          stroke="#d5c9b8"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Mug body outer */}
        <path d={mugClipPath} fill="url(#cf-mug-grad)" />

        {/* Mug interior (dark) */}
        <ellipse cx="45" cy={MUG_TOP} rx="23" ry="5" fill="url(#cf-mug-inner)" />

        {/* Liquid inside (clipped to mug shape) */}
        {progress > 0 && (
          <g clipPath="url(#cf-mug-clip)">
            <path className={`cf-wave${fluid ? " cf-fluid" : ""}`} d={liquidPath} fill="url(#cf-liquid-grad)" />
          </g>
        )}

        {/* Foam */}
        {foamPath && (
          <path d={foamPath} fill="rgba(210, 190, 160, 0.6)" />
        )}

        {/* Liquid surface ellipse — sits on top */}
        {progress > 5 && (
          <ellipse
            className={fluid ? "cf-fluid-surface" : undefined}
            cx="45"
            cy={liquidTop}
            rx={(liqRightX - liqLeftX) / 2}
            ry="3"
            fill={color}
            opacity="0.5"
          />
        )}

        {/* Rim highlight */}
        <ellipse cx="45" cy={MUG_TOP} rx="23" ry="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <ellipse cx="45" cy={MUG_TOP + 1} rx="21" ry="3.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />

        {/* Left edge highlight */}
        <line x1={RIM_LEFT_X + 1} y1={MUG_TOP + 3} x2={BOT_LEFT_X + 1} y2={MUG_BOTTOM - 2} stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />

        {/* Percentage inside coffee */}
        {showPercentage && progress > 5 && (
          <text
            x="45"
            y={(liquidTop + MUG_BOTTOM) / 2 + 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="cf-percentage-svg"
            stroke={color}
            fill="white"
          >
            {Math.round(progress)}%
          </text>
        )}

        {/* Coffee pot */}
        {showPot && (
          <>
            <g transform={POT_TRANSFORM}>
              <path d={POT_BODY_PATH} fill="rgba(180,210,230,0.3)" stroke="#aaa" strokeWidth="0.7" />
              <path d="M-10,-5 Q-9,5 -7,12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
              <path d="M-6,-14 L-6,-17 Q0,-19 6,-17 L6,-14" fill="#4a4a4a" stroke="#3a3a3a" strokeWidth="0.6" />
              <rect x="-2" y="-20" width="4" height="2" rx="1" fill="#3a3a3a" />
              <path d="M10,-8 C18,-6 18,8 10,10" fill="none" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10,-8 C16,-6 16,8 10,10" fill="none" stroke="#5a5a5a" strokeWidth="0.7" strokeLinecap="round" />
              <path d="M-5,-14 L-10,-17 L-12,-13" fill="rgba(180,210,230,0.3)" stroke="#aaa" strokeWidth="0.7" strokeLinejoin="round" />
            </g>

            <rect
              className={fluid ? "cf-fluid-pot" : undefined}
              x="35"
              y={potLiquidY}
              width="90"
              height="60"
              fill={color}
              opacity="0.75"
              clipPath="url(#cf-pot-clip)"
            />
          </>
        )}

        {/* Pour stream */}
        {streamVisible && (
          <path
            className="cf-stream"
            d="M44,-32 Q44.5,-2 45,27"
            fill="none"
            stroke={color}
            strokeWidth={streamWidth}
            strokeLinecap="round"
            opacity={streamOpacity}
          />
        )}

        {/* Steam */}
        <g className={`cf-steam-g ${showSteam ? "visible" : ""}`}>
          <path className="cf-wisp" d="M38,24 Q36,18 39,12 Q42,6 38,0" />
          <path className="cf-wisp" d="M45,22 Q47,16 44,10 Q41,4 45,-2" />
          <path className="cf-wisp" d="M52,24 Q50,18 53,12 Q56,6 52,0" />
        </g>
      </svg>
    </div>
  );
}
