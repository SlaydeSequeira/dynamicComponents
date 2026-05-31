import { useState } from "react";
import SlideToAction from "../../components/buttons/slideToAction";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "label", type: "text", default: "Book a call" },
  { propName: "completedLabel", type: "text", default: "Booked!" },
  { propName: "accentColor", type: "hex", default: "#a8e020" },
  { propName: "threshold", type: "slider", min: 0.5, max: 1, default: 0.8, step: 0.05 },
  { propName: "width", type: "slider", min: 200, max: 500, default: 320 },
  { propName: "height", type: "slider", min: 50, max: 120, default: 80 },
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
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Slide the green knob right to confirm.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <SlideToAction onComplete={() => addLog("Default completed")} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Custom Labels + Color</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <SlideToAction
            label="Confirm Payment"
            completedLabel="Paid!"
            accentColor="#4fc3f7"
            onComplete={() => addLog("Payment confirmed")}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Sizes</h4>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <SlideToAction width={240} height={60} label="Small" onComplete={() => addLog("Small completed")} />
          <SlideToAction onComplete={() => addLog("Default completed")} />
          <SlideToAction width={420} height={100} label="Large" onComplete={() => addLog("Large completed")} />
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
            ["label", "string", '"Book a call"', "Resting text"],
            ["completedLabel", "string", '"Booked!"', "Text shown after completion"],
            ["accentColor", "string (hex)", "#a8e020", "Knob color"],
            ["icon", "ReactNode", "Dotted arrow", "Custom icon inside knob"],
            ["threshold", "number (0-1)", "0.8", "Slide distance to trigger"],
            ["onComplete", "() => void", "—", "Fires on successful slide"],
            ["autoReset", "boolean", "true", "Reset after completion"],
            ["width", "number", "320", "Width in px"],
            ["height", "number", "80", "Height in px"],
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

function SlideToActionUsage() {
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
      <h2>SlideToAction</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Drag-to-confirm button with glossy dark pill and sliding green knob.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={SlideToAction} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "SlideToAction",
  category: "Buttons",
  component: SlideToActionUsage,
} satisfies UsageEntry;
