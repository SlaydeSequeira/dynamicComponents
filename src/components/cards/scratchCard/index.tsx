import { useRef, useEffect, useState, useCallback } from "react";
import type { ScratchCardProps } from "./interfaces";
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_INTERNAL_COLOR,
  DEFAULT_INNER_TEXT,
  DEFAULT_OUTER_TEXT,
  DEFAULT_OVERLAY_COLOR,
  calcScratchPercent,
} from "./utils";
import "./styles/index.css";

export type { ScratchCardProps } from "./interfaces";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  color: string;
}

export default function ScratchCard({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  overlayColor = DEFAULT_OVERLAY_COLOR,
  outerText = DEFAULT_OUTER_TEXT,
  internalColor = DEFAULT_INTERNAL_COLOR,
  innerText = DEFAULT_INNER_TEXT,
  brushSize = 25,
  revealAt = 50,
  onReveal,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratchPct, setScratchPct] = useState(0);
  const scratching = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const particles = useRef<Particle[]>([]);
  const confetti = useRef<Confetti[]>([]);
  const animFrame = useRef<number>(0);
  const showConfetti = useRef(false);

  const hexToRgb = (hex: string) => {
    const c = hex.replace("#", "");
    const full = c.length === 3 ? c.split("").map(ch => ch + ch).join("") : c;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const rgb = hexToRgb(overlayColor);
    const grad = ctx.createLinearGradient(0, 0, width, height);
    const lighten = (r: number, g: number, b: number, amt: number) =>
      `rgb(${Math.min(255, r + amt)},${Math.min(255, g + amt)},${Math.min(255, b + amt)})`;
    const darken = (r: number, g: number, b: number, amt: number) =>
      `rgb(${Math.max(0, r - amt)},${Math.max(0, g - amt)},${Math.max(0, b - amt)})`;

    grad.addColorStop(0, lighten(rgb.r, rgb.g, rgb.b, 60));
    grad.addColorStop(0.3, lighten(rgb.r, rgb.g, rgb.b, 30));
    grad.addColorStop(0.5, overlayColor);
    grad.addColorStop(0.7, darken(rgb.r, rgb.g, rgb.b, 20));
    grad.addColorStop(1, lighten(rgb.r, rgb.g, rgb.b, 40));

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 3000; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      const a = Math.random() * 0.08;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(px, py, 1, 1);
    }

    const shineGrad = ctx.createLinearGradient(0, 0, width * 0.7, height * 0.5);
    shineGrad.addColorStop(0, "rgba(255,255,255,0.15)");
    shineGrad.addColorStop(0.5, "rgba(255,255,255,0.02)");
    shineGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shineGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${Math.min(width, height) * 0.1}px "Plus Jakarta Sans", system-ui, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(outerText, width / 2, height / 2);
  }, [width, height, overlayColor, outerText]);

  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    pCanvas.width = width;
    pCanvas.height = height;
  }, [width, height]);

  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current = particles.current.filter(p => p.opacity > 0.01);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.opacity *= 0.92;
        p.size *= 0.97;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      confetti.current = confetti.current.filter(c => c.opacity > 0.01);
      for (const c of confetti.current) {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.12;
        c.vx *= 0.99;
        c.rotation += c.rotationSpeed;
        c.opacity *= 0.985;

        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [width, height]);

  const spawnParticles = useCallback((x: number, y: number) => {
    const rgb = hexToRgb(overlayColor);
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      const shade = Math.floor(Math.random() * 40) - 20;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 1.5 + Math.random() * 3,
        opacity: 0.6 + Math.random() * 0.4,
        color: `rgb(${Math.min(255, rgb.r + shade)},${Math.min(255, rgb.g + shade)},${Math.min(255, rgb.b + shade)})`,
      });
    }
  }, [overlayColor]);

  const spawnConfetti = useCallback(() => {
    const colors = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];
    const cx = width / 2;
    const cy = height / 2;
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      confetti.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        size: 4 + Math.random() * 6,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, [width, height]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || revealed) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.globalCompositeOperation = "destination-out";

      if (lastPos.current) {
        ctx.lineWidth = brushSize * 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPos.current = { x, y };
      spawnParticles(x, y);

      const pct = calcScratchPercent(ctx, width, height);
      setScratchPct(Math.round(pct));
      if (pct >= revealAt) {
        setRevealed(true);
        if (!showConfetti.current) {
          showConfetti.current = true;
          spawnConfetti();
        }
        onReveal?.();
      }
    },
    [width, height, brushSize, revealAt, revealed, onReveal, spawnParticles, spawnConfetti]
  );

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div
      className="sc-container"
      style={{ "--sc-w": `${width}px`, "--sc-h": `${height}px` } as React.CSSProperties}
    >
      <div className="sc-content">
        {children ?? (
          <div className="sc-inner-face" style={{ background: internalColor }}>
            {innerText}
          </div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className={`sc-canvas ${revealed ? "revealed" : ""}`}
        onPointerDown={(e) => {
          scratching.current = true;
          lastPos.current = null;
          const { x, y } = getPos(e);
          scratch(x, y);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!scratching.current) return;
          const { x, y } = getPos(e);
          scratch(x, y);
        }}
        onPointerUp={() => {
          scratching.current = false;
          lastPos.current = null;
        }}
        onPointerCancel={() => {
          scratching.current = false;
          lastPos.current = null;
        }}
      />
      <canvas
        ref={particleCanvasRef}
        className="sc-particles"
      />
      {!revealed && scratchPct > 0 && (
        <div className="sc-progress">
          <div className="sc-progress-fill" style={{ width: `${(scratchPct / revealAt) * 100}%` }} />
        </div>
      )}
    </div>
  );
}
