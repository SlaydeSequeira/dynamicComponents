import { useState, useCallback } from "react";
import type { MorphingHamburgerProps } from "./interfaces";
import { DEFAULT_SIZE, DEFAULT_THICKNESS } from "./utils";
import "./styles/index.css";

export type { MorphingHamburgerProps } from "./interfaces";

export default function MorphingHamburger({
  isOpen: controlledOpen,
  onChange,
  size = DEFAULT_SIZE,
  color = "#ffffff",
  thickness = DEFAULT_THICKNESS,
}: MorphingHamburgerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onChange?.(next);
  }, [isOpen, isControlled, onChange]);

  const vars = {
    "--mh-size": `${size}px`,
    "--mh-color": color,
    "--mh-thick": `${thickness}px`,
  } as React.CSSProperties;

  return (
    <button
      className={`mh-btn ${isOpen ? "open" : ""}`}
      style={vars}
      onClick={toggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="mh-box">
        <span className="mh-line l1" />
        <span className="mh-line l2" />
        <span className="mh-line l3" />
      </div>
    </button>
  );
}
