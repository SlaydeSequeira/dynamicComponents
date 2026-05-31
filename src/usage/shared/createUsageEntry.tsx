import type { UsageEntry } from "../registry";
import { UsagePage } from "./UsagePage";
import type { UsagePageConfig } from "./types";

export const createUsageEntry = (config: UsagePageConfig): UsageEntry => ({
  title: config.title,
  category: config.category,
  component: () => <UsagePage {...config} />,
});
