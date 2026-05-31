import { useState } from "react";
import LiquidCheckbox from "../../components/inputs/liquidCheckbox";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "checked", type: "toggle", default: false, linkedOnChange: "onChange" },
  { propName: "size", type: "slider", min: 24, max: 64, default: 32 },
  { propName: "color", type: "hex", default: "#7cb3f5" },
  { propName: "label", type: "text", default: "Accept terms" },
];

function Examples() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Click to toggle.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <LiquidCheckbox checked={checked1} onChange={setChecked1} label="Accept terms" />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Pre-checked, large</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <LiquidCheckbox checked={checked2} onChange={setChecked2} size={48} color="#e74c3c" label="Subscribe" />
        </div>
      </section>
    </div>
  );
}

function PropsTable() {
  return (
    <div>
      <h3>Props Reference</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Prop</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Type</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Default</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["checked", "boolean", "false", "Controlled checked state"],
            ["onChange", "(checked: boolean) => void", "--", "Fires on toggle"],
            ["size", "number", "32", "Checkbox size in px"],
            ["color", "string (hex)", "#7cb3f5", "Accent color"],
            ["label", "string", "--", "Label text"],
          ].map(([prop, type, def, desc]) => (
            <tr key={prop} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: "8px 12px", color: "#7cb3f5", fontFamily: "monospace" }}>{prop}</td>
              <td style={{ padding: "8px 12px", color: "#999", fontFamily: "monospace" }}>{type}</td>
              <td style={{ padding: "8px 12px", color: "#aaa" }}>{def}</td>
              <td style={{ padding: "8px 12px", color: "#bbb" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LiquidCheckboxUsage() {
  const [tab, setTab] = useState<"playground" | "examples" | "props">("playground");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 20px",
    border: "none",
    borderBottom: active ? "2px solid #7cb3f5" : "2px solid transparent",
    background: "transparent",
    color: active ? "#7cb3f5" : "#666",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  });

  return (
    <div>
      <h2>LiquidCheckbox</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Checkbox with liquid fill animation.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={LiquidCheckbox} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "LiquidCheckbox",
  category: "Inputs",
  component: LiquidCheckboxUsage,
} satisfies UsageEntry;
