import { useState } from "react";
import CompleteOrderButton from "../../components/buttons/completeOrderButton";
import type { UsageEntry } from "../registry";

function CompleteOrderButtonUsage() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${msg}`]);

  return (
    <div>
      <h2>CompleteOrderButton</h2>
      <p style={{ color: "#999", marginBottom: 8 }}>
        Pill-shaped delivery button. Click to trigger a truck animation that
        drives in, loads a package, and drives away.
      </p>

      <section style={{ marginBottom: 40 }}>
        <h3>Default (Day Mode)</h3>
        <p style={{ color: "#777", fontSize: 14 }}>No props needed — renders the default day scene.</p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton onComplete={() => addLog("Day mode completed")} />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>Night Mode</h3>
        <p style={{ color: "#777", fontSize: 14 }}>
          <code>mode="night"</code> — dark sky with stars and a moon.
        </p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton
            mode="night"
            onComplete={() => addLog("Night mode completed")}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>Custom Colors</h3>
        <p style={{ color: "#777", fontSize: 14 }}>
          <code>truckColor="#e63946"</code> <code>truckSecondaryColor="#f1faee"</code>{" "}
          <code>boxColor="#a8dadc"</code>
        </p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton
            truckColor="#e63946"
            truckSecondaryColor="#f1faee"
            boxColor="#a8dadc"
            onComplete={() => addLog("Custom color completed")}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>Fast Speed</h3>
        <p style={{ color: "#777", fontSize: 14 }}>
          <code>speed={"{90}"}</code> — nearly twice as fast.
        </p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton
            speed={90}
            label="Rush Order"
            successLabel="Shipped!"
            onComplete={() => addLog("Fast delivery completed")}
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>No Headlights, No Smoke</h3>
        <p style={{ color: "#777", fontSize: 14 }}>
          <code>shouldHeadlightComeOn={"{false}"}</code>{" "}
          <code>shouldExhaustReleaseSmoke={"{false}"}</code>
        </p>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <CompleteOrderButton
            shouldHeadlightComeOn={false}
            shouldExhaustReleaseSmoke={false}
            onComplete={() => addLog("Stealth delivery completed")}
          />
        </div>
      </section>

      <section>
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
      </section>

      {log.length > 0 && (
        <section style={{ marginTop: 32, padding: 16, background: "#1a1a2e", borderRadius: 8 }}>
          <h4 style={{ margin: "0 0 8px", color: "#666" }}>Event Log</h4>
          {log.map((entry, i) => (
            <div key={i} style={{ fontSize: 13, color: "#58d499", fontFamily: "monospace" }}>
              {entry}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default {
  title: "CompleteOrderButton",
  category: "Buttons",
  component: CompleteOrderButtonUsage,
} satisfies UsageEntry;
