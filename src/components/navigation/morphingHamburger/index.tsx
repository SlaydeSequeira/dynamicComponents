import { useCallback } from "react";
import type { MorphingHamburgerProps } from "./interfaces";
import { DEFAULT_SIZE, DEFAULT_THICKNESS } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import "./styles/index.css";

export type { MorphingHamburgerProps } from "./interfaces";

export default function MorphingHamburger({
  isOpen: controlledOpen,
  onChange,
  size = DEFAULT_SIZE,
  color = "#ffffff",
  thickness = DEFAULT_THICKNESS,
}: MorphingHamburgerProps) {
  const [isOpen, setIsOpen] = useControllableState({
    controlledValue: controlledOpen,
    defaultValue: false,
    onChange,
  });

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

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
