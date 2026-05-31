import type { InputRenderer, InputRendererProps } from "./types";

const inputStyle: React.CSSProperties = {
  background: "#1a1a2e",
  border: "1px solid #2a2a44",
  borderRadius: 6,
  padding: "8px 12px",
  color: "#eee",
  fontSize: 14,
  fontFamily: "monospace",
  outline: "none",
  width: "100%",
};

// --- Dropdown ---

function DropdownInput({ config, value, onChange }: InputRendererProps) {
  return (
    <select
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    >
      {(config.options ?? []).map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// --- Hex ---

function isValidHex(v: string) {
  return /^[0-9a-fA-F]{0,6}$/.test(v);
}

function HexInput({ config, value, onChange }: InputRendererProps) {
  const raw = value as string;
  const valid = isValidHex(raw);
  const preview =
    raw.length === 3 || raw.length === 6
      ? `#${raw}`
      : (config.default as string);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          border: "1px solid #2a2a44",
          background: preview,
          flexShrink: 0,
        }}
      />
      <div style={{ position: "relative", flex: 1 }}>
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#555",
            fontSize: 14,
            fontFamily: "monospace",
            pointerEvents: "none",
          }}
        >
          #
        </span>
        <input
          style={{
            ...inputStyle,
            paddingLeft: 24,
            borderColor: valid ? "#2a2a44" : "#e63946",
          }}
          value={raw}
          placeholder={(config.default as string).replace(/^#/, "")}
          onChange={(e) => {
            const v = e.target.value.replace(/^#/, "");
            if (isValidHex(v)) onChange(v);
          }}
          maxLength={6}
        />
      </div>
    </div>
  );
}

// --- Text ---

function TextInput({ config, value, onChange }: InputRendererProps) {
  return (
    <input
      style={inputStyle}
      value={value as string}
      placeholder={config.default as string}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// --- Toggle ---

function ToggleInput({ value, onChange }: InputRendererProps) {
  const active = value as boolean;
  return (
    <button
      onClick={() => onChange(!active)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        border: "none",
        cursor: "pointer",
        background: active ? "#58d499" : "#2a2a44",
        position: "relative",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: active ? 20 : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .2s",
        }}
      />
    </button>
  );
}

// --- Slider ---

function SliderInput({ config, value, onChange }: InputRendererProps) {
  const min = config.min ?? 0;
  const max = config.max ?? 100;
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#7cb3f5" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#555",
        }}
      >
        <span>{min}</span>
        <span>{value as number}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Registry — add new input types here
// ──────────────────────────────────────────────

const inputRenderers: Record<string, InputRenderer> = {
  dropdown: DropdownInput,
  hex: HexInput,
  text: TextInput,
  toggle: ToggleInput,
  slider: SliderInput,
};

export default inputRenderers;
