import OrbitalLoader from "../../components/loaders/orbitalLoader";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";

const playgroundConfig: PropConfig[] = [
  { propName: "size", type: "slider", min: 40, max: 200, default: 80, description: "Overall size in px" },
  { propName: "coreColor", type: "hex", default: "#7cb3f5", description: "Core dot color" },
  { propName: "orbitals", type: "slider", min: 1, max: 8, default: 3, description: "Number of orbiting dots" },
  { propName: "speed", type: "slider", min: 1, max: 5, default: 2, description: "Seconds per revolution" },
];

export default createUsageEntry({
  title: "OrbitalLoader",
  category: "Loaders",
  description: "Animated loader with dots orbiting a central core.",
  component: OrbitalLoader,
  playgroundConfig,
  exampleConfigs: [
    { title: "Default", items: [{}] },
    {
      title: "Large with 5 orbitals",
      items: [{ props: { size: 140, orbitals: 5, coreColor: "#e74c3c" } }],
    },
  ],
});
