import { useState } from "react";
import EmojiRating from "../../components/inputs/emojiRating";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const playgroundConfig: PropConfig[] = [
  { propName: "value", type: "slider", min: 0, max: 1, default: 0.5, step: 0.001, linkedOnChange: "onChange" },
  { propName: "width", type: "slider", min: 200, max: 500, default: 280 },
  { propName: "emojiSize", type: "slider", min: 32, max: 80, default: 48 },
];

function Examples() {
  const [val1, setVal1] = useState(0.5);
  const [val2, setVal2] = useState(0);

  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Default</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Drag the emoji along the track. Value: {val1.toFixed(2)}</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <EmojiRating value={val1} onChange={setVal1} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Large</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Value: {val2.toFixed(2)}</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <EmojiRating value={val2} onChange={setVal2} width={400} emojiSize={64} />
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
            ["value", "number (0-1)", "0.5", "Continuous rating value"],
            ["onChange", "(value: number) => void", "—", "Fires on every drag tick"],
            ["width", "number", "280", "Track width in px"],
            ["emojiSize", "number", "48", "Emoji diameter in px"],
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

function EmojiRatingUsage() {
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
      <h2>EmojiRating</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Continuous emoji slider — face morphs smoothly as you drag.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={EmojiRating} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "EmojiRating",
  category: "Inputs",
  component: EmojiRatingUsage,
} satisfies UsageEntry;
