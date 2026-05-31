import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { PropConfig } from "../playground/types";

export interface ExtraPropReference {
  readonly prop: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

export type ExampleLayout = "center" | "row" | "column";

export interface ExampleItemConfig {
  readonly props?: Record<string, unknown>;
  readonly children?: ReactNode;
}

export interface ExampleConfig {
  readonly title: string;
  readonly description?: string;
  readonly layout?: ExampleLayout;
  readonly gap?: number;
  readonly padding?: number;
  readonly items: readonly ExampleItemConfig[];
}

export interface UsagePageConfig {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly component: ComponentType<Record<string, unknown>>;
  readonly playgroundComponent?: ComponentType<Record<string, unknown>>;
  readonly playgroundConfig: readonly PropConfig[];
  readonly extraProps?: readonly ExtraPropReference[];
  readonly examples?: ReactNode;
  readonly exampleConfigs?: readonly ExampleConfig[];
}

export const cardFaceStyle = (
  background: string,
  color = "#fff",
  fontSize = 18,
  fontWeight: CSSProperties["fontWeight"] = undefined
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  background,
  color,
  borderRadius: 12,
  fontSize,
  fontWeight,
});
