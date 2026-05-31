export function PlaneSvg() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M30,16 L2,5 L12,16 Z"
        fill="var(--pas-plane-color, #fff)"
      />
      <path
        d="M30,16 L2,27 L12,16 Z"
        fill="var(--pas-plane-color, #fff)"
        opacity="0.7"
      />
      <path
        d="M12,16 L16,24 L17,17 Z"
        fill="var(--pas-plane-color, #fff)"
        opacity="0.5"
      />
      <line
        x1="30" y1="16" x2="12" y2="16"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
