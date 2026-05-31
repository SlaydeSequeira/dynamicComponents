interface CheckIconProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function CheckIcon({
  className,
  stroke = "currentColor",
  strokeWidth = 2.5,
}: CheckIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
