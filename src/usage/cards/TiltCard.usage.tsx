import { useState } from "react";
import TiltCard from "../../components/cards/tiltCard";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const TiltCardWithContent = (props: Record<string, unknown>) => (
  <TiltCard {...props}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#1e293b", color: "#fff", borderRadius: 12, fontSize: 18 }}>
      Hover &amp; tilt me
    </div>
  </TiltCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300 },
  { propName: "height", type: "slider", min: 150, max: 400, default: 200 },
  { propName: "maxTilt", type: "slider", min: 5, max: 30, default: 15 },
  { propName: "glare", type: "toggle", default: true },
];

function Examples() {
  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>With Glare</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Hover to see the tilt and glare effect.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <TiltCard width={300} height={200} glare>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#1e293b", color: "#fff", borderRadius: 12, fontSize: 18 }}>
              Glare enabled
            </div>
          </TiltCard>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Without Glare</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <TiltCard width={300} height={200} glare={false} maxTilt={25}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#7c3aed", color: "#fff", borderRadius: 12, fontSize: 18 }}>
              No glare, more tilt
            </div>
          </TiltCard>
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
            ["children", "ReactNode", "--", "Card content"],
            ["width", "number", "300", "Card width in px"],
            ["height", "number", "200", "Card height in px"],
            ["maxTilt", "number", "15", "Max tilt in degrees"],
            ["glare", "boolean", "true", "Show glare overlay on hover"],
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

function TiltCardUsage() {
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
      <h2>TiltCard</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        A card that tilts toward the cursor with optional glare effect.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={TiltCardWithContent} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "TiltCard",
  category: "Cards",
  component: TiltCardUsage,
} satisfies UsageEntry;
