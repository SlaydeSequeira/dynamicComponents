import { useState } from "react";
import DayNightToggle from "../../components/buttons/dayNightToggle";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "isNight", type: "toggle", default: false, linkedOnChange: "onChange" },
  { propName: "scale", type: "slider", min: 0.5, max: 3, default: 1 },
];

function Examples() {
  const [night1, setNight1] = useState(false);
  const [night2, setNight2] = useState(true);

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Click to toggle between day and night.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <DayNightToggle isNight={night1} onChange={setNight1} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Starting at Night</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <DayNightToggle isNight={night2} onChange={setNight2} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Sizes</h4>
        <p style={{ color: "#777", fontSize: 14 }}>
          <code>scale={"{0.7}"}</code>, <code>scale={"{1}"}</code>, <code>scale={"{1.5}"}</code>
        </p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
          <DayNightToggle scale={0.7} />
          <DayNightToggle scale={1} />
          <DayNightToggle scale={1.5} />
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
            ["isNight", "boolean", "false", "Controlled state — true = night"],
            ["onChange", "(isNight: boolean) => void", "—", "Fires on toggle with the new state"],
            ["scale", "number", "1", "Size multiplier (1 = 140×64px)"],
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

function DayNightToggleUsage() {
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
      <h2>DayNightToggle</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Animated toggle switch with sun/moon knob, clouds, and stars.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={DayNightToggle} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "DayNightToggle",
  category: "Buttons",
  component: DayNightToggleUsage,
} satisfies UsageEntry;
