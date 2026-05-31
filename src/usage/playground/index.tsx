import { useState, useCallback, type ComponentType } from "react";
import { EventLog, useEventLog } from "../shared/EventLog";
import inputRenderers from "./inputTypes";
import type { PropConfig } from "./types";

export type { PropConfig } from "./types";

interface PlaygroundProps {
  component: ComponentType<Record<string, unknown>>;
  config: PropConfig[];
}

function buildInitialState(config: PropConfig[]): Record<string, unknown> {
  const state: Record<string, unknown> = {};
  for (const c of config) {
    if (c.type === "hex") {
      state[c.propName] = "";
    } else if (c.type === "text") {
      state[c.propName] = "";
    } else {
      state[c.propName] = c.default;
    }
  }
  return state;
}

function buildProps(
  config: PropConfig[],
  state: Record<string, unknown>,
  updater: (propName: string, value: unknown) => void
): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  for (const c of config) {
    const v = state[c.propName];
    if (c.type === "hex") {
      const raw = v as string;
      if (raw.length === 3 || raw.length === 6) props[c.propName] = `#${raw}`;
    } else if (c.type === "text") {
      if ((v as string) !== "") props[c.propName] = v;
    } else {
      props[c.propName] = v;
    }
    if (typeof c.linkedOnChange === "string") {
      props[c.linkedOnChange] = (val: unknown) => updater(c.propName, val);
    }
  }
  return props;
}

export default function Playground({ component: Component, config }: PlaygroundProps) {
  const [state, setState] = useState(() => buildInitialState(config));
  const { log, addLog, clearLog } = useEventLog();

  const update = useCallback(
    (propName: string, value: unknown) =>
      setState((prev) => ({ ...prev, [propName]: value })),
    []
  );

  const resetAll = useCallback(() => {
    setState(buildInitialState(config));
    clearLog();
  }, [config, clearLog]);

  const resolvedProps = buildProps(config, state, update);
  resolvedProps.onComplete = () => addLog("onComplete fired");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Playground</h3>
        <button
          onClick={resetAll}
          style={{
            background: "#2a2a44",
            border: "1px solid #3a3a55",
            borderRadius: 6,
            color: "#999",
            padding: "6px 14px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Reset All
        </button>
      </div>

      <div
        style={{
          padding: 32,
          display: "flex",
          justifyContent: "center",
          background: "#0a0a16",
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <Component {...resolvedProps} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          padding: 20,
          background: "#12121f",
          borderRadius: 12,
          border: "1px solid #2a2a44",
        }}
      >
        {config.map((c) => {
          const Renderer = inputRenderers[c.type];
          if (!Renderer) {
            return (
              <div key={c.propName} style={{ color: "#e63946", fontSize: 13 }}>
                Unknown type: "{c.type}" for {c.propName}
              </div>
            );
          }

          const isDefault =
            c.type === "hex" || c.type === "text"
              ? (state[c.propName] as string) === ""
              : state[c.propName] === c.default;

          const isInline = c.type === "toggle";

          return (
            <div
              key={c.propName}
              style={{
                display: "flex",
                flexDirection: isInline ? "row" : "column",
                alignItems: isInline ? "center" : "stretch",
                gap: isInline ? 10 : 4,
              }}
            >
              {!isInline && (
                <div style={{ fontSize: 13, color: "#888", fontFamily: "monospace" }}>
                  {c.propName}
                </div>
              )}
              <Renderer
                config={c}
                value={state[c.propName]}
                onChange={(v) => update(c.propName, v)}
              />
              {isInline && (
                <div style={{ fontSize: 13, color: "#888", fontFamily: "monospace" }}>
                  {c.propName}
                </div>
              )}
              {isDefault && (
                <div style={{ fontSize: 11, color: "#555" }}>Using default</div>
              )}
            </div>
          );
        })}
      </div>

      <EventLog entries={log} />
    </div>
  );
}
