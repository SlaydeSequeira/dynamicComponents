import { useState } from "react";
import FlipCard from "../../components/cards/flipCard";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const FlipCardWithContent = (props: Record<string, unknown>) => (
  <FlipCard
    front={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#1e293b", color: "#fff", borderRadius: 12, fontSize: 18 }}>Front Side</div>}
    back={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#7c3aed", color: "#fff", borderRadius: 12, fontSize: 18 }}>Back Side</div>}
    {...props}
  />
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300 },
  { propName: "height", type: "slider", min: 150, max: 400, default: 200 },
  { propName: "direction", type: "dropdown", options: ["horizontal", "vertical"], default: "horizontal" },
  { propName: "trigger", type: "dropdown", options: ["hover", "click"], default: "hover" },
];

function Examples() {
  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Horizontal Flip (hover)</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Hover to flip horizontally.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <FlipCard
            direction="horizontal"
            trigger="hover"
            front={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#1e293b", color: "#fff", borderRadius: 12, fontSize: 18 }}>Front</div>}
            back={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#7c3aed", color: "#fff", borderRadius: 12, fontSize: 18 }}>Back</div>}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Vertical Flip (click)</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Click to flip vertically.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <FlipCard
            direction="vertical"
            trigger="click"
            front={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#0f766e", color: "#fff", borderRadius: 12, fontSize: 18 }}>Click Me</div>}
            back={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#b91c1c", color: "#fff", borderRadius: 12, fontSize: 18 }}>Flipped!</div>}
          />
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
            ["front", "ReactNode", "--", "Content for the front face"],
            ["back", "ReactNode", "--", "Content for the back face"],
            ["width", "number", "300", "Card width in px"],
            ["height", "number", "200", "Card height in px"],
            ["direction", '"horizontal" | "vertical"', '"horizontal"', "Flip axis"],
            ["trigger", '"hover" | "click"', '"hover"', "How the flip is triggered"],
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

function FlipCardUsage() {
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
      <h2>FlipCard</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        A card that flips to reveal back content on hover or click.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={FlipCardWithContent} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "FlipCard",
  category: "Cards",
  component: FlipCardUsage,
} satisfies UsageEntry;
