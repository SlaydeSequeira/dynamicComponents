import { useState, useRef, useCallback, useEffect } from "react";
import type { SlideToActionProps } from "./interfaces";
import { BASE_WIDTH, BASE_HEIGHT, KNOB_PAD } from "./utils";
import { clamp } from "../../shared/utils";
import "./styles/index.css";

export type { SlideToActionProps } from "./interfaces";

function DottedArrow() {
  const r = 1.6;
  const dots: [number, number][] = [];

  for (let row = 0; row < 5; row++) {
    const cols = row <= 2 ? row + 1 : 5 - row;
    for (let col = 0; col < cols; col++) {
      dots.push([col * 5, row * 5]);
    }
  }
  const chevronX = 16;
  for (let row = 0; row < 5; row++) {
    const cols = row <= 2 ? row + 1 : 5 - row;
    for (let col = 0; col < cols; col++) {
      dots.push([chevronX + col * 5, row * 5]);
    }
  }

  return (
    <svg viewBox="-2 -2 38 24" width="36" height="24">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function SlideToAction({
  label = "Book a call",
  completedLabel = "Booked!",
  accentColor,
  icon,
  threshold = 0.8,
  onComplete,
  autoReset = true,
  width: w = BASE_WIDTH,
  height: h = BASE_HEIGHT,
}: SlideToActionProps) {
  const [completed, setCompleted] = useState(false);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const pad = KNOB_PAD;
  const knobW = h * 1.5;
  const maxSlide = w - knobW - pad * 2;
  const fullWidth = w - pad * 2;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (completed) return;
      dragging.current = true;
      startX.current = e.clientX - offset;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [offset, completed]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      setOffset(clamp(e.clientX - startX.current, 0, maxSlide));
    },
    [maxSlide]
  );

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    if (offset >= maxSlide * threshold) {
      setAnimating(true);
      setCompleted(true);
      setOffset(maxSlide);
      onComplete?.();

      if (autoReset) {
        setTimeout(() => {
          setCompleted(false);
          setOffset(0);
          setTimeout(() => setAnimating(false), 400);
        }, 1600);
      } else {
        setTimeout(() => setAnimating(false), 400);
      }
    } else {
      setAnimating(true);
      setOffset(0);
      setTimeout(() => setAnimating(false), 400);
    }
  }, [offset, maxSlide, threshold, onComplete, autoReset]);

  useEffect(() => {
    return () => {
      dragging.current = false;
    };
  }, []);

  const vars = {
    "--sta-w": `${w}px`,
    "--sta-h": `${h}px`,
    "--sta-knob-w": `${knobW}px`,
    "--sta-pad": `${pad}px`,
  } as React.CSSProperties;

  const currentWidth = completed ? fullWidth : knobW + offset;

  const knobStyle: React.CSSProperties = {
    left: pad,
    width: currentWidth,
  };

  if (accentColor) {
    knobStyle.background = `linear-gradient(180deg, ${accentColor} 0%, ${accentColor} 100%)`;
  }

  return (
    <div
      ref={shellRef}
      className={`sta-shell ${completed ? "completed" : ""}`}
      style={vars}
    >
      <span className="sta-label">
        {completed ? completedLabel : label}
      </span>

      <div
        className={`sta-knob ${animating ? "animating" : ""}`}
        style={knobStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="sta-icon" style={{ position: "absolute", left: knobW / 2, transform: "translateX(-50%)" }}>
          {icon ?? <DottedArrow />}
        </span>
      </div>

      <span className="sta-check">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12.5l5 5L20 6.5"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
