import { useState, type CSSProperties } from "react";
import Playground from "../playground";
import { ConfigExamples } from "./ConfigExamples";
import { PropsReference } from "./PropsReference";
import type { UsagePageConfig } from "./types";

type Tab = "playground" | "examples" | "props";

const tabStyle = (active: boolean): CSSProperties => ({
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

export const UsagePage = ({
  title,
  description,
  component,
  playgroundComponent,
  playgroundConfig,
  extraProps,
  examples,
  exampleConfigs,
}: UsagePageConfig) => {
  const [tab, setTab] = useState<Tab>("playground");
  const PlaygroundTarget = playgroundComponent ?? component;

  const examplesContent =
    examples ??
    (exampleConfigs ? (
      <ConfigExamples component={component} sections={exampleConfigs} />
    ) : null);

  return (
    <div>
      <h2>{title}</h2>
      <p style={{ color: "#999", marginBottom: 16 }}>{description}</p>

      <div
        style={{
          borderBottom: "1px solid #2a2a44",
          marginBottom: 24,
          display: "flex",
          gap: 4,
        }}
      >
        <button style={tabStyle(tab === "playground")} onClick={() => setTab("playground")}>
          Playground
        </button>
        {examplesContent && (
          <button style={tabStyle(tab === "examples")} onClick={() => setTab("examples")}>
            Examples
          </button>
        )}
        <button style={tabStyle(tab === "props")} onClick={() => setTab("props")}>
          Props
        </button>
      </div>

      {tab === "playground" && (
        <Playground component={PlaygroundTarget} config={[...playgroundConfig]} />
      )}
      {tab === "examples" && examplesContent}
      {tab === "props" && (
        <PropsReference playgroundConfig={playgroundConfig} extraProps={extraProps} />
      )}
    </div>
  );
};
