import { useState } from "react";
import CompleteOrderButton from "../../components/buttons/completeOrderButton";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "mode", type: "dropdown", options: ["day", "night"], default: "day" },
  { propName: "truckColor", type: "hex", default: "#2f57e6" },
  { propName: "truckSecondaryColor", type: "hex", default: "#f5f7fc" },
  { propName: "boxColor", type: "hex", default: "#e0ad58" },
  { propName: "speed", type: "slider", min: 1, max: 100, default: 50 },
  { propName: "label", type: "text", default: "Complete Order" },
  { propName: "successLabel", type: "text", default: "Order Placed" },
  { propName: "shouldHeadlightComeOn", type: "toggle", default: true },
  { propName: "shouldExhaustReleaseSmoke", type: "toggle", default: true },
  { propName: "autoReset", type: "toggle", default: true },
];

function Examples() {
  const [log, setLog] = useState<string[]>([]);
  const addLog = (msg: string) =>
    setLog((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${msg}`]);

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default (Day Mode)</h4>
        <p style={{ color: "#777", fontSize: 14 }}>No props needed.</p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton onComplete={() => addLog("Day mode completed")} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Night Mode</h4>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton mode="night" onComplete={() => addLog("Night mode completed")} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Custom Colors</h4>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton
            truckColor="#e63946"
            truckSecondaryColor="#f1faee"
            boxColor="#a8dadc"
            onComplete={() => addLog("Custom color completed")}
          />
        </div>
      </section>

      {log.length > 0 && (
        <div style={{ marginTop: 16, padding: 14, background: "#1a1a2e", borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>Event Log</div>
          {log.map((entry, i) => (
            <div key={i} style={{ fontSize: 13, color: "#58d499", fontFamily: "monospace" }}>{entry}</div>
          ))}
        </div>
      )}
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
            ["mode", '"day" | "night"', '"day"', "Scene theme"],
            ["truckColor", "string (hex)", "#2f57e6", "Cab / accent color"],
            ["truckSecondaryColor", "string (hex)", "#f5f7fc", "Cargo body color"],
            ["boxColor", "string (hex)", "#e0ad58", "Package color"],
            ["shouldHeadlightComeOn", "boolean", "true", "Headlight glow on departure"],
            ["shouldExhaustReleaseSmoke", "boolean", "true", "Exhaust smoke on departure"],
            ["speed", "number (1-100)", "50", "Animation speed multiplier"],
            ["label", "string", '"Complete Order"', "Resting button text"],
            ["successLabel", "string", '"Order Placed"', "Done state text"],
            ["onComplete", "() => void", "—", "Fires when animation finishes"],
            ["autoReset", "boolean", "true", "Auto-reset to idle after done"],
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

function CompleteOrderButtonUsage() {
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
      <h2>CompleteOrderButton</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Pill-shaped delivery button with truck animation.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={CompleteOrderButton} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "CompleteOrderButton",
  category: "Buttons",
  component: CompleteOrderButtonUsage,
} satisfies UsageEntry;
