import CoffeeLoader from "../../components/loaders/coffeeLoader";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";

const playgroundConfig: PropConfig[] = [
  { propName: "size", type: "slider", min: 60, max: 200, default: 100, description: "Overall size in px" },
  { propName: "color", type: "hex", default: "#6f4e37", description: "Coffee/cup color" },
  {
    propName: "progress",
    type: "slider",
    min: 0,
    max: 100,
    default: 50,
    description: "0-100 fill progress (auto-animates if omitted)",
    docDefault: "auto",
  },
  { propName: "showPercentage", type: "toggle", default: false, description: "Show progress percentage text" },
  { propName: "showPot", type: "toggle", default: false, description: "Show coffee pot pouring into the mug" },
  { propName: "fluid", type: "toggle", default: false, description: "Gentle sloshing wave on the liquid" },
];

export default createUsageEntry({
  title: "CoffeeLoader",
  category: "Loaders",
  description: "Coffee cup loader with fill animation.",
  component: CoffeeLoader,
  playgroundConfig,
  exampleConfigs: [
    { title: "Default", items: [{}] },
    {
      title: "Custom color and size",
      items: [{ props: { size: 150, color: "#e74c3c", progress: 75 } }],
    },
  ],
});
