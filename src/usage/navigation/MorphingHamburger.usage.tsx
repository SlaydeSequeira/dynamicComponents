import { useState } from "react";
import MorphingHamburger from "../../components/navigation/morphingHamburger";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "isOpen", type: "toggle", default: false, linkedOnChange: "onChange" },
  { propName: "size", type: "slider", min: 24, max: 60, default: 40 },
  { propName: "color", type: "hex", default: "#ffffff" },
  { propName: "thickness", type: "slider", min: 2, max: 5, default: 3 },
];

function Examples() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Click to morph between hamburger and close.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <MorphingHamburger isOpen={open1} onChange={setOpen1} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Large, colored, thick</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <MorphingHamburger isOpen={open2} onChange={setOpen2} size={56} color="#e74c3c" thickness={4} />
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
            ["isOpen", "boolean", "false", "Controlled open state"],
            ["onChange", "(isOpen: boolean) => void", "--", "Fires on toggle"],
            ["size", "number", "40", "Icon size in px"],
            ["color", "string (hex)", "#ffffff", "Line color"],
            ["thickness", "number", "3", "Line thickness in px"],
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

function MorphingHamburgerUsage() {
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
      <h2>MorphingHamburger</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Hamburger icon that morphs into a close icon.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={MorphingHamburger} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "MorphingHamburger",
  category: "Navigation",
  component: MorphingHamburgerUsage,
} satisfies UsageEntry;
