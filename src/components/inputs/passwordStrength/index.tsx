import { useState, useCallback } from "react";
import type { PasswordStrengthProps } from "./interfaces";
import { DEFAULT_WIDTH, getStrength, STRENGTH_CONFIG } from "./utils";
import "./styles/index.css";

export type { PasswordStrengthProps } from "./interfaces";

export default function PasswordStrength({
  value: controlledValue,
  onChange,
  width = DEFAULT_WIDTH,
  placeholder = "Enter password...",
}: PasswordStrengthProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  const strength = getStrength(value);
  const config = STRENGTH_CONFIG[strength];

  return (
    <div className="ps-container" style={{ "--ps-w": `${width}px` } as React.CSSProperties}>
      <div className="ps-input-wrap">
        <input
          className="ps-input"
          type="password"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          style={{ "--ps-color": config.color } as React.CSSProperties}
        />
      </div>
      <div className="ps-bar-track">
        <div
          className="ps-bar-fill"
          style={{ width: `${config.pct}%`, background: config.color }}
        />
      </div>
      <span className="ps-label" style={{ color: config.color }}>{config.label}</span>
    </div>
  );
}
