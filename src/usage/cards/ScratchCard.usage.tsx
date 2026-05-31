import { useState } from "react";
import ScratchCard from "../../components/cards/scratchCard";
import Playground, { type PropConfig } from "../playground";
import type { UsageEntry } from "../registry";

const ScratchCardWithContent = (props: Record<string, unknown>) => (
  <ScratchCard {...props}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#065f46", color: "#34d399", fontSize: 22, fontWeight: 700 }}>
      You won $50!
    </div>
  </ScratchCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300 },
  { propName: "height", type: "slider", min: 100, max: 300, default: 180 },
  { propName: "overlayColor", type: "hex", default: "#888888" },
  { propName: "brushSize", type: "slider", min: 10, max: 50, default: 25 },
  { propName: "revealAt", type: "slider", min: 20, max: 80, default: 50 },
];

function Examples() {
  return (
    <div>
      <h3>Examples</h3>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Prize Card</h4>
        <p style={{ color: "#777", fontSize: 14 }}>Scratch the overlay to reveal the prize underneath.</p>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <ScratchCard width={300} height={180}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#065f46", color: "#34d399", fontSize: 22, fontWeight: 700 }}>
              You won $50!
            </div>
          </ScratchCard>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ color: "#aaa" }}>Custom Overlay</h4>
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <ScratchCard width={280} height={160} overlayColor="#c084fc" brushSize={35} revealAt={40}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#1e1b4b", color: "#e0e7ff", fontSize: 20, fontWeight: 700 }}>
              Secret Message
            </div>
          </ScratchCard>
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
            ["children", "ReactNode", "--", "Content revealed after scratching"],
            ["width", "number", "300", "Card width in px"],
            ["height", "number", "180", "Card height in px"],
            ["overlayColor", "string (hex)", "#888", "Scratch overlay color"],
            ["brushSize", "number", "25", "Brush radius in px"],
            ["revealAt", "number", "50", "% scratched to auto-reveal"],
            ["onReveal", "() => void", "--", "Fires when card is revealed"],
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

function ScratchCardUsage() {
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
      <h2>ScratchCard</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Scratch-off overlay that reveals hidden content underneath.
      </p>

      <div style={{ borderBottom: "1px solid #2a2a44", marginBottom: 24, display: "flex", gap: 4 }}>
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>Playground</button>
        <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>Examples</button>
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>Props</button>
      </div>

      {tab === "playground" && (
        <Playground component={ScratchCardWithContent} config={playgroundConfig} />
      )}
      {tab === "examples" && <Examples />}
      {tab === "props" && <PropsTable />}
    </div>
  );
}

export default {
  title: "ScratchCard",
  category: "Cards",
  component: ScratchCardUsage,
} satisfies UsageEntry;
