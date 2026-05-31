import type { ComponentType } from "react";

export interface PropConfig {
  propName: string;
  type: string;
  default: unknown;
  options?: string[];
  min?: number;
  max?: number;
  /** Type label shown in the props reference table */
  propType?: string;
  /** Description shown in the props reference table */
  description?: string;
  /** Override default value display in the props reference table */
  docDefault?: string;
  [key: string]: unknown;
}

export interface InputRendererProps {
  config: PropConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

export type InputRenderer = ComponentType<InputRendererProps>;
