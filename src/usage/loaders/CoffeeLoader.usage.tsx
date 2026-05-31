import { useState } from "react";
import CoffeeLoader from "../../components/loaders/coffeeLoader";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "size", type: "slider", min: 60, max: 200, default: 100 },
  { propName: "color", type: "hex", default: "#6f4e37" },
  { propName: "progress", type: "slider", min: 0, max: 100, default: 50 },
];

function Examples() {
  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <CoffeeLoader />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Custom color and size</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <CoffeeLoader size={150} color="#e74c3c" progress={75} />
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
            ["size", "number", "100", "Overall size in px"],
            ["color", "string (hex)", "#6f4e37", "Coffee/cup color"],
            ["progress", "number", "auto", "0-100 fill progress (auto-animates if omitted)"],
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

function CoffeeLoaderUsage() {
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
      <h2>CoffeeLoader</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Coffee cup loader with fill animation.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={CoffeeLoader} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "CoffeeLoader",
  category: "Loaders",
  component: CoffeeLoaderUsage,
} satisfies UsageEntry;
