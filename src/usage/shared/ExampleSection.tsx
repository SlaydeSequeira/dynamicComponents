import type { CSSProperties, ReactNode } from "react";
import type { ExampleLayout } from "./types";

interface ExampleSectionProps {
  readonly title: string;
  readonly description?: ReactNode;
  readonly layout?: ExampleLayout;
  readonly gap?: number;
  readonly padding?: number;
  readonly children: ReactNode;
}

const layoutStyles = (
  layout: ExampleLayout,
  gap: number,
  padding: number
): CSSProperties => {
  const base: CSSProperties = {
    padding,
    display: "flex",
    justifyContent: "center",
  };

  if (layout === "column") {
    return { ...base, flexDirection: "column", alignItems: "center", gap };
  }
  if (layout === "row") {
    return { ...base, alignItems: "center", gap };
  }
  return base;
};

export const ExampleSection = ({
  title,
  description,
  layout = "center",
  gap = 20,
  padding = 32,
  children,
}: ExampleSectionProps) => (
  <section style={{ marginBottom: 40 }}>
    <h4 style={{ color: "#aaa" }}>{title}</h4>
    {description && (
      <p style={{ color: "#777", fontSize: 14, margin: "4px 0 0" }}>{description}</p>
    )}
    <div style={layoutStyles(layout, gap, padding)}>{children}</div>
  </section>
);

interface ExamplesPanelProps {
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}

export const ExamplesPanel = ({ children, footer }: ExamplesPanelProps) => (
  <div>
    <h3>Examples</h3>
    {children}
    {footer}
  </div>
);
