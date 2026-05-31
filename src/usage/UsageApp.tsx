import { useState, useMemo } from "react";
import { usageEntries, type UsageEntry } from "./registry";

export default function UsageApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, { entry: UsageEntry; index: number }[]>();
    usageEntries.forEach((entry, index) => {
      const list = map.get(entry.category) ?? [];
      list.push({ entry, index });
      map.set(entry.category, list);
    });
    return map;
  }, []);

  const ActiveComponent = usageEntries[activeIndex]?.component;

  return (
    <div className="usage-shell" style={{ display: "flex", minHeight: "100vh", background: "#0f0f1a", color: "#eee" }}>
      <button
        className={`sidebar-toggle${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <nav
        className={`usage-sidebar${sidebarOpen ? " open" : ""}`}
        style={{
          width: 260,
          minWidth: 260,
          background: "#16162a",
          borderRight: "1px solid #2a2a44",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <div
          style={{
            padding: "0 20px 20px",
            borderBottom: "1px solid #2a2a44",
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            Components
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#666" }}>
            {usageEntries.length} component{usageEntries.length !== 1 ? "s" : ""}
          </p>
        </div>

        {[...grouped.entries()].map(([category, items]) => (
          <div key={category} style={{ marginBottom: 12 }}>
            <div
              style={{
                padding: "4px 20px",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#555",
              }}
            >
              {category}
            </div>
            {items.map(({ entry, index }) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setSidebarOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 20px",
                  border: "none",
                  background: activeIndex === index ? "#2a2a44" : "transparent",
                  color: activeIndex === index ? "#7cb3f5" : "#aaa",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background .15s, color .15s",
                  borderLeft: activeIndex === index ? "3px solid #7cb3f5" : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeIndex !== index) e.currentTarget.style.background = "#1e1e38";
                }}
                onMouseLeave={(e) => {
                  if (activeIndex !== index) e.currentTarget.style.background = "transparent";
                }}
              >
                {entry.title}
              </button>
            ))}
          </div>
        ))}

        {usageEntries.length === 0 && (
          <p style={{ padding: "20px", color: "#555", fontSize: 14 }}>
            No usage demos found. Add a <code>.usage.tsx</code> file under{" "}
            <code>src/usage/</code> to get started.
          </p>
        )}
      </nav>

      <main className="usage-main" style={{ flex: 1, padding: "32px 48px", overflow: "auto" }}>
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div style={{ color: "#555", marginTop: 80, textAlign: "center" }}>
            <h2>No component selected</h2>
            <p>Pick one from the sidebar.</p>
          </div>
        )}
      </main>
    </div>
  );
}
