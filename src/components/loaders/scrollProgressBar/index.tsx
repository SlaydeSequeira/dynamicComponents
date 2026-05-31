import { useState, useEffect } from "react";
import type { ScrollProgressBarProps, Character } from "./interfaces";
import { DEFAULT_HEIGHT, CHARACTER_SIZE } from "./utils";
import "./styles/index.css";

export type { ScrollProgressBarProps, Character } from "./interfaces";

function Snail() {
  return (
    <g className="spb-anim-crawl">
      {/* Body */}
      <ellipse cx="16" cy="26" rx="13" ry="4" fill="currentColor" opacity=".75" />
      {/* Shell */}
      <circle cx="13" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M13,10 C17,10 19,13 19,16 C19,19 17,21 13,21" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="16" r="2.5" fill="currentColor" opacity=".35" />
      {/* Antennae */}
      <path d="M27,23 Q30,16 33,14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="33" cy="13" r="1.8" fill="currentColor" />
      <path d="M29,22 Q31,18 32,17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="16" r="1.5" fill="currentColor" />
      {/* Eye */}
      <circle cx="33.5" cy="13" r=".8" fill="#fff" />
    </g>
  );
}

function Car() {
  return (
    <g className="spb-anim-bounce">
      {/* Body */}
      <rect x="4" y="14" width="28" height="10" rx="3" fill="currentColor" />
      {/* Roof */}
      <path d="M12,14 L16,7 L26,7 L28,14" fill="currentColor" opacity=".85" />
      {/* Window */}
      <path d="M17,8.5 L25.5,8.5 L27,13 L15,13 Z" fill="rgba(255,255,255,.35)" />
      {/* Window divider */}
      <line x1="21" y1="8.5" x2="21" y2="13" stroke="currentColor" strokeWidth="1" opacity=".5" />
      {/* Bumpers */}
      <rect x="2" y="18" width="3" height="4" rx="1" fill="currentColor" opacity=".6" />
      <rect x="31" y="18" width="3" height="4" rx="1" fill="currentColor" opacity=".6" />
      {/* Headlight */}
      <rect x="31" y="15" width="2.5" height="3" rx="1" fill="#fde68a" />
      {/* Taillight */}
      <rect x="3" y="15" width="2" height="3" rx="1" fill="#fca5a5" />
      {/* Wheels */}
      <g><circle cx="12" cy="25" r="4" fill="#1e1e2e" /><circle cx="12" cy="25" r="1.5" fill="#888" /></g>
      <g><circle cx="27" cy="25" r="4" fill="#1e1e2e" /><circle cx="27" cy="25" r="1.5" fill="#888" /></g>
    </g>
  );
}

function Truck() {
  return (
    <g className="spb-anim-bounce">
      {/* Cargo box */}
      <rect x="2" y="8" width="22" height="16" rx="2" fill="currentColor" opacity=".85" />
      {/* Cargo stripe */}
      <rect x="2" y="16" width="22" height="3" fill="currentColor" />
      {/* Cargo door lines */}
      <line x1="7" y1="10" x2="7" y2="24" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
      <line x1="12" y1="10" x2="12" y2="24" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
      {/* Cab */}
      <rect x="22" y="12" width="14" height="12" rx="3" fill="currentColor" />
      {/* Window */}
      <rect x="27" y="14" width="7" height="5" rx="2" fill="rgba(255,255,255,.35)" />
      {/* Headlight */}
      <rect x="34" y="20" width="2" height="2.5" rx="1" fill="#fde68a" />
      {/* Exhaust pipe */}
      <rect x="1" y="22" width="3" height="2" rx="1" fill="#555" />
      {/* Wheels */}
      <g><circle cx="10" cy="26" r="4" fill="#1e1e2e" /><circle cx="10" cy="26" r="1.5" fill="#888" /></g>
      <g><circle cx="30" cy="26" r="4" fill="#1e1e2e" /><circle cx="30" cy="26" r="1.5" fill="#888" /></g>
    </g>
  );
}

function Rocket() {
  return (
    <g className="spb-anim-wobble">
      {/* Body */}
      <ellipse cx="22" cy="16" rx="12" ry="5" fill="currentColor" />
      {/* Nose cone */}
      <path d="M34,16 L40,16 Q38,13 34,11 Z" fill="currentColor" />
      <path d="M34,16 L40,16 Q38,19 34,21 Z" fill="currentColor" opacity=".8" />
      {/* Window */}
      <circle cx="28" cy="16" r="2.5" fill="rgba(255,255,255,.35)" />
      <circle cx="28" cy="16" r="1.5" fill="rgba(135,206,250,.5)" />
      {/* Fins */}
      <path d="M12,11 L8,5 L14,11 Z" fill="currentColor" opacity=".7" />
      <path d="M12,21 L8,27 L14,21 Z" fill="currentColor" opacity=".7" />
      {/* Flame */}
      <g className="spb-flame">
        <path d="M10,13 Q4,16 10,19 Q6,16 10,13 Z" fill="#ef4444" opacity=".9" />
        <path d="M10,14 Q6,16 10,18 Q7,16 10,14 Z" fill="#f59e0b" />
        <path d="M10,15 Q8,16 10,17" fill="#fde68a" />
      </g>
      {/* Stripe */}
      <rect x="20" y="11" width="2" height="10" rx="1" fill="rgba(255,255,255,.2)" />
    </g>
  );
}

function Bicycle() {
  return (
    <g className="spb-anim-bob">
      {/* Frame */}
      <path d="M11,20 L20,12 L29,20 L20,20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="20" y1="12" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
      {/* Handlebars */}
      <path d="M20,12 L24,10 L25,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Seat */}
      <line x1="17" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Seat post */}
      <line x1="19" y1="11" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
      {/* Wheels */}
      <g>
        <circle cx="11" cy="23" r="5.5" fill="none" stroke="#555" strokeWidth="1.5" />
        <circle cx="11" cy="23" r="1" fill="currentColor" />
      </g>
      <g>
        <circle cx="29" cy="23" r="5.5" fill="none" stroke="#555" strokeWidth="1.5" />
        <circle cx="29" cy="23" r="1" fill="currentColor" />
      </g>
      {/* Spokes */}
      <line x1="11" y1="18" x2="11" y2="28" stroke="#555" strokeWidth=".5" />
      <line x1="6" y1="23" x2="16" y2="23" stroke="#555" strokeWidth=".5" />
      <line x1="29" y1="18" x2="29" y2="28" stroke="#555" strokeWidth=".5" />
      <line x1="24" y1="23" x2="34" y2="23" stroke="#555" strokeWidth=".5" />
    </g>
  );
}

function Runner() {
  return (
    <g className="spb-anim-bob">
      {/* Head */}
      <circle cx="22" cy="6" r="3.5" fill="currentColor" />
      {/* Body */}
      <line x1="20" y1="9" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <g className="spb-arm-back" style={{ transformOrigin: "19px 11px" }}>
        <line x1="19" y1="11" x2="14" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="spb-arm-front" style={{ transformOrigin: "19px 11px" }}>
        <line x1="19" y1="11" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Legs */}
      <g className="spb-leg-back" style={{ transformOrigin: "18px 18px" }}>
        <line x1="18" y1="18" x2="14" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="spb-leg-front" style={{ transformOrigin: "18px 18px" }}>
        <line x1="18" y1="18" x2="22" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Shoe tips */}
    </g>
  );
}

function Caterpillar() {
  return (
    <g className="spb-anim-undulate">
      {/* Body segments (back to front) */}
      <circle cx="6" cy="20" r="4" fill="currentColor" opacity=".5" />
      <circle cx="13" cy="19" r="4.5" fill="currentColor" opacity=".6" />
      <circle cx="21" cy="18" r="5" fill="currentColor" opacity=".75" />
      <circle cx="30" cy="17" r="5.5" fill="currentColor" />
      {/* Face */}
      <circle cx="33" cy="15" r="1" fill="#fff" />
      <circle cx="33.5" cy="15" r=".5" fill="#333" />
      {/* Smile */}
      <path d="M31,18 Q33,20 35,18" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth=".8" strokeLinecap="round" />
      {/* Antennae */}
      <path d="M33,12 Q35,7 37,6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="37" cy="5.5" r="1.2" fill="currentColor" />
      <path d="M31,12 Q32,8 34,7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="34" cy="6.5" r="1" fill="currentColor" />
      {/* Tiny legs */}
      <line x1="6" y1="24" x2="6" y2="27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="13" y1="23" x2="13" y2="27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="21" y1="23" x2="21" y2="27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="30" y1="22" x2="30" y2="27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

function Train() {
  return (
    <g className="spb-anim-bounce">
      {/* Boiler */}
      <rect x="8" y="10" width="20" height="12" rx="3" fill="currentColor" />
      {/* Cab */}
      <rect x="2" y="6" width="10" height="16" rx="2" fill="currentColor" opacity=".85" />
      {/* Cab window */}
      <rect x="4" y="8" width="6" height="5" rx="1" fill="rgba(255,255,255,.35)" />
      {/* Smokestack */}
      <rect x="24" y="4" width="5" height="8" rx="1.5" fill="currentColor" opacity=".8" />
      <ellipse cx="26.5" cy="4" rx="3.5" ry="1.5" fill="currentColor" />
      {/* Smoke puffs */}
      <circle cx="26" cy="2" r="2" fill="rgba(200,200,200,.3)">
        <animate attributeName="cy" values="2;-2;2" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".3;0;.3" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="r" values="2;4;2" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* Cowcatcher */}
      <path d="M28,22 L34,18 L34,22 Z" fill="currentColor" opacity=".7" />
      {/* Headlight */}
      <circle cx="33" cy="15" r="1.5" fill="#fde68a" />
      {/* Stripe */}
      <rect x="8" y="14" width="20" height="2" rx="1" fill="rgba(255,255,255,.2)" />
      {/* Chassis */}
      <rect x="2" y="22" width="32" height="3" rx="1" fill="currentColor" opacity=".6" />
      {/* Wheels */}
      <g><circle cx="8" cy="27" r="3.5" fill="#1e1e2e" /><circle cx="8" cy="27" r="1.2" fill="#888" /></g>
      <g><circle cx="18" cy="27" r="3.5" fill="#1e1e2e" /><circle cx="18" cy="27" r="1.2" fill="#888" /></g>
      <g><circle cx="28" cy="27" r="3.5" fill="#1e1e2e" /><circle cx="28" cy="27" r="1.2" fill="#888" /></g>
    </g>
  );
}

const CHARACTER_MAP: Record<Character, () => JSX.Element> = {
  snail: Snail,
  car: Car,
  truck: Truck,
  rocket: Rocket,
  bicycle: Bicycle,
  runner: Runner,
  caterpillar: Caterpillar,
  train: Train,
};

const TRAIL_CHARACTERS = new Set<Character>(["snail", "rocket", "train"]);

export default function ScrollProgressBar({
  character = "car",
  progress: controlledProgress,
  trackColor,
  progressColor,
  characterColor,
  height = DEFAULT_HEIGHT,
  showTrail = true,
  showPercentage = false,
  onProgress,
}: ScrollProgressBarProps) {
  const [autoProgress, setAutoProgress] = useState(0);
  const progress = Math.min(100, Math.max(0, controlledProgress ?? autoProgress));

  useEffect(() => {
    if (controlledProgress !== undefined) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, pct));
      setAutoProgress(clamped);
      onProgress?.(clamped);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlledProgress, onProgress]);

  useEffect(() => {
    if (controlledProgress !== undefined) {
      onProgress?.(controlledProgress);
    }
  }, [controlledProgress, onProgress]);

  const CharSVG = CHARACTER_MAP[character];
  const hasSpecialTrail = showTrail && TRAIL_CHARACTERS.has(character);

  const vars: Record<string, string> = {
    "--spb-height": `${height}px`,
    "--spb-char-size": `${CHARACTER_SIZE}px`,
  };
  if (trackColor) vars["--spb-track-color"] = trackColor;
  if (progressColor) vars["--spb-progress-color"] = progressColor;
  if (characterColor) vars["--spb-char-color"] = characterColor;

  const fillClass = [
    "spb-fill",
    hasSpecialTrail ? `trail-${character}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className="spb-wrap"
      style={vars as React.CSSProperties}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Character */}
      <div
        className="spb-character"
        style={{
          left: `${progress}%`,
          transform: `translateX(-${progress}%) translateY(-50%)`,
        }}
      >
        <svg viewBox="0 0 40 32" fill="none">
          <CharSVG />
        </svg>
      </div>

      {/* Track */}
      <div className="spb-track">
        <div
          className={fillClass}
          style={{ width: `${progress}%` }}
        />
      </div>

      {showPercentage && (
        <span className="spb-pct">{Math.round(progress)}%</span>
      )}
    </div>
  );
}
