import type { ComponentType } from "react";

export interface PropConfig {
  propName: string;
  type: string;
  default: unknown;
  options?: string[];
  min?: number;
  max?: number;
  [key: string]: unknown;
}

export interface InputRendererProps {
  config: PropConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

export type InputRenderer = ComponentType<InputRendererProps>;
