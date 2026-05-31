import ScrollProgressBar from "../../components/loaders/scrollProgressBar";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "character",
    type: "dropdown",
    options: ["snail", "car", "truck", "rocket", "bicycle", "runner", "caterpillar", "train"],
    default: "car",
    propType: "Character",
    description: "Animated character riding the progress bar",
  },
  {
    propName: "progress",
    type: "slider",
    min: 0,
    max: 100,
    default: 40,
    description: "0-100 progress (auto-scrolls if omitted)",
    docDefault: "auto (scroll)",
  },
  { propName: "height", type: "slider", min: 3, max: 16, default: 6, description: "Track height in px" },
  { propName: "progressColor", type: "hex", default: "#7cb3f5", description: "Fill bar color" },
  { propName: "characterColor", type: "hex", default: "", description: "Character color (defaults to progressColor)" },
  { propName: "trackColor", type: "hex", default: "#1a1a2e", description: "Track background color" },
  { propName: "showTrail", type: "toggle", default: true, description: "Character-specific trail effect" },
  { propName: "showPercentage", type: "toggle", default: false, description: "Show percentage text" },
];

const extraProps = [
  { prop: "onProgress", type: "(progress: number) => void", default: "—", description: "Called with current progress value" },
];

const ScrollProgressBarExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="All Characters" layout="column" gap={28} padding={32}>
      {(["snail", "car", "truck", "rocket", "bicycle", "runner", "caterpillar", "train"] as const).map(
        (char) => (
          <div key={char} style={{ width: "100%" }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8, textTransform: "capitalize" }}>
              {char}
            </div>
            <ScrollProgressBar character={char} progress={60} />
          </div>
        )
      )}
    </ExampleSection>
    <ExampleSection title="Custom Colors" layout="column" gap={24} padding={32}>
      <div style={{ width: "100%" }}>
        <ScrollProgressBar character="rocket" progress={75} progressColor="#ef4444" showTrail />
      </div>
      <div style={{ width: "100%" }}>
        <ScrollProgressBar character="snail" progress={35} progressColor="#22c55e" characterColor="#16a34a" showTrail />
      </div>
      <div style={{ width: "100%" }}>
        <ScrollProgressBar character="train" progress={55} progressColor="#a855f7" showTrail showPercentage />
      </div>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "ScrollProgressBar",
  category: "Loaders",
  description: "Animated progress bar with selectable character riding along.",
  component: ScrollProgressBar,
  playgroundConfig,
  extraProps,
  examples: <ScrollProgressBarExamples />,
});
