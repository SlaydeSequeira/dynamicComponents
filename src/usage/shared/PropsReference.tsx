import type { PropConfig } from "../playground/types";
import type { ExtraPropReference } from "./types";

const formatDocDefault = (config: PropConfig): string => {
  if (typeof config.docDefault === "string") return config.docDefault;

  const { type, default: defaultValue } = config;
  if (type === "text" && typeof defaultValue === "string") return `"${defaultValue}"`;
  if (type === "hex" && typeof defaultValue === "string") return defaultValue;
  if (type === "toggle") return String(defaultValue);
  if (type === "dropdown" && typeof defaultValue === "string") return `"${defaultValue}"`;
  if (type === "slider") return String(defaultValue);

  return String(defaultValue ?? "—");
};

const inferPropType = (config: PropConfig): string => {
  if (typeof config.propType === "string") return config.propType;

  switch (config.type) {
    case "slider":
      return "number";
    case "toggle":
      return "boolean";
    case "hex":
      return "string (hex)";
    case "text":
      return "string";
    case "dropdown":
      return config.options?.map((o) => `"${o}"`).join(" | ") ?? "string";
    default:
      return "unknown";
  }
};

interface PropsReferenceProps {
  readonly playgroundConfig: readonly PropConfig[];
  readonly extraProps?: readonly ExtraPropReference[];
}

export const PropsReference = ({ playgroundConfig, extraProps = [] }: PropsReferenceProps) => {
  const rows: ExtraPropReference[] = [
    ...playgroundConfig
      .filter((c) => c.description)
      .map((c) => ({
        prop: c.propName,
        type: inferPropType(c),
        default: formatDocDefault(c),
        description: c.description as string,
      })),
    ...extraProps,
  ];

  return (
    <div>
      <h3>Props Reference</h3>
      <div className="props-table-wrapper">
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
          {rows.map(({ prop, type, default: def, description }) => (
            <tr key={prop} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: "8px 12px", color: "#7cb3f5", fontFamily: "monospace" }}>
                {prop}
              </td>
              <td style={{ padding: "8px 12px", color: "#999", fontFamily: "monospace" }}>
                {type}
              </td>
              <td style={{ padding: "8px 12px", color: "#aaa" }}>{def}</td>
              <td style={{ padding: "8px 12px", color: "#bbb" }}>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
