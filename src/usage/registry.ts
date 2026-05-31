import type { ComponentType } from "react";

export interface UsageEntry {
  title: string;
  category: string;
  component: ComponentType;
}

const modules = import.meta.glob<{ default: UsageEntry }>("./**/*.usage.tsx", {
  eager: true,
});

export const usageEntries: UsageEntry[] = Object.values(modules).map(
  (m) => m.default
);
