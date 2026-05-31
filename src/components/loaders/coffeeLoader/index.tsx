import { useState, useEffect, useMemo } from "react";
import type { CoffeeLoaderProps } from "./interfaces";
import { DEFAULT_SIZE } from "./utils";
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
  const [autoProgress, setAutoProgress] = useState(0);
  const progress = controlledProgress ?? autoProgress;

  useEffect(() => {
    if (controlledProgress !== undefined) return;
    const interval = setInterval(() => {
      setAutoProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, [controlledProgress]);

  const showSteam = progress > 50;

  // Pot geometry
  const potBodyPath = "M-5,-14 C-8,-10 -12,-3 -12,3 Q-11,11 -6,14 Q0,17 6,14 Q11,11 12,3 C12,-3 8,-10 5,-14 Z";
  const potTransform = "translate(88,-30) rotate(-45) scale(2.5)";
  const potLiquidY = -48 + (progress / 100) * 53;
  const streamVisible = showPot && progress > 0 && progress < 97;
  const streamWidth = 3 - (progress / 100) * 2.2;
  const streamOpacity = 1 - (progress / 100) * 0.6;

  // Mug geometry (in a 100x100 viewBox)
  const mugTop = 28;
  const mugBottom = 78;
  const mugHeight = mugBottom - mugTop;
  const rimLeftX = 22;
  const rimRightX = 68;
  const botLeftX = 28;
  const botRightX = 62;

  // Liquid fill — interpolate Y from bottom to top
  const liquidTop = mugBottom - (progress / 100) * mugHeight;

  // At liquidTop, interpolate X between rim and bottom positions
  const tLiq = (liquidTop - mugTop) / mugHeight;
  const liqLeftX = rimLeftX + (botLeftX - rimLeftX) * tLiq;
  const liqRightX = rimRightX + (botRightX - rimRightX) * tLiq;

  const liquidPath = useMemo(() => {
    if (progress <= 0) return "";
    return `M${liqLeftX},${liquidTop}
            Q${(liqLeftX + liqRightX) / 2},${liquidTop + 2} ${liqRightX},${liquidTop}
            L${botRightX},${mugBottom}
            Q${(botLeftX + botRightX) / 2},${mugBottom + 4} ${botLeftX},${mugBottom}
            Z`;
  }, [progress, liquidTop, liqLeftX, liqRightX, botLeftX, botRightX, mugBottom]);

  // Foam sits on top of liquid when > 20%
  const foamPath = useMemo(() => {
    if (progress < 20) return "";
    const foamY = liquidTop;
    return `M${liqLeftX},${foamY}
            Q${(liqLeftX + liqRightX) / 2},${foamY - 1.5} ${liqRightX},${foamY}
            Q${(liqLeftX + liqRightX) / 2},${foamY + 3} ${liqLeftX},${foamY}
            Z`;
  }, [progress, liquidTop, liqLeftX, liqRightX]);

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
            <path d={`M${rimLeftX},${mugTop} L${botLeftX},${mugBottom} Q${(botLeftX + botRightX) / 2},${mugBottom + 5} ${botRightX},${mugBottom} L${rimRightX},${mugTop} Z`} />
          </clipPath>
          {showPot && (
            <clipPath id="cf-pot-clip">
              <path d={potBodyPath} transform={potTransform} />
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
        <path
          d={`M${rimLeftX},${mugTop} L${botLeftX},${mugBottom} Q${(botLeftX + botRightX) / 2},${mugBottom + 5} ${botRightX},${mugBottom} L${rimRightX},${mugTop} Z`}
          fill="url(#cf-mug-grad)"
        />

        {/* Mug interior (dark) */}
        <ellipse cx="45" cy={mugTop} rx="23" ry="5" fill="url(#cf-mug-inner)" />

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
        <ellipse cx="45" cy={mugTop} rx="23" ry="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <ellipse cx="45" cy={mugTop + 1} rx="21" ry="3.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />

        {/* Left edge highlight */}
        <line x1={rimLeftX + 1} y1={mugTop + 3} x2={botLeftX + 1} y2={mugBottom - 2} stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />

        {/* Percentage inside coffee */}
        {showPercentage && progress > 5 && (
          <text
            x="45"
            y={(liquidTop + mugBottom) / 2 + 2}
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
            <g transform={potTransform}>
              <path d={potBodyPath} fill="rgba(180,210,230,0.3)" stroke="#aaa" strokeWidth="0.7" />
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
