import { useState } from "react";
import PasswordStrength from "../../components/inputs/passwordStrength";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 400, default: 300 },
  { propName: "placeholder", type: "text", default: "Enter password..." },
];

function Examples() {
  const [pw, setPw] = useState("");

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Type a password to see the strength meter.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <PasswordStrength value={pw} onChange={setPw} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Wide with custom placeholder</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <PasswordStrength width={380} placeholder="Create a strong password..." />
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
            ["value", "string", "--", "Controlled password value"],
            ["onChange", "(value: string) => void", "--", "Fires on input change"],
            ["width", "number", "300", "Input width in px"],
            ["placeholder", "string", '"Enter password..."', "Input placeholder text"],
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

function PasswordStrengthUsage() {
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
      <h2>PasswordStrength</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Password input with real-time strength indicator.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={PasswordStrength} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "PasswordStrength",
  category: "Inputs",
  component: PasswordStrengthUsage,
} satisfies UsageEntry;
