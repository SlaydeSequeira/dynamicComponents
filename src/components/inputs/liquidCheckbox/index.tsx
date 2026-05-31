import { useCallback } from "react";
import type { LiquidCheckboxProps } from "./interfaces";
import { DEFAULT_SIZE } from "./utils";
import { useControllableState } from "../../shared/useControllableState";
import { toggleKeyHandler } from "../../shared/keyboard";
import "./styles/index.css";

export type { LiquidCheckboxProps } from "./interfaces";

export default function LiquidCheckbox({
  checked: controlledChecked,
  onChange,
  size = DEFAULT_SIZE,
  color = "#7cb3f5",
  label,
}: LiquidCheckboxProps) {
  const [checked, setChecked] = useControllableState({
    controlledValue: controlledChecked,
    defaultValue: false,
    onChange,
  });

  const toggle = useCallback(() => setChecked(!checked), [checked, setChecked]);

  return (
    <div
      className={`lc-wrap ${checked ? "checked" : ""}`}
      style={{ "--lc-size": `${size}px`, "--lc-color": color } as React.CSSProperties}
      onClick={toggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={toggleKeyHandler(toggle)}
    >
      <div className="lc-box">
        <div className="lc-fill">
          <div className="lc-wave" />
        </div>
        <span className="lc-check">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5l5 5L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {label && <span className="lc-label">{label}</span>}
    </div>
  );
}
