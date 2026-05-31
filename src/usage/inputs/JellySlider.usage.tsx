import JellySlider from "../../components/inputs/jellySlider";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { EventLog, useEventLog } from "../shared/EventLog";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 600, default: 400, description: "Width in px" },
  { propName: "height", type: "slider", min: 80, max: 200, default: 120, description: "Height in px" },
  { propName: "showPercentage", type: "toggle", default: true, description: "Show percentage label" },
];

const extraProps = [
  { prop: "value", type: "number (0-1)", default: "0", description: "Controlled slider value" },
  { prop: "onChange", type: "(value: number) => void", default: "—", description: "Fires on value change" },
  { prop: "color", type: "[r, g, b]", default: "[0.2, 0.6, 1.0]", description: "Jelly body color (0-1 range)" },
  { prop: "glowTint", type: "[r, g, b]", default: "[0.1, 0.5, 1.0]", description: "Glow tint color (0-1 range)" },
];

const JellySliderExamples = () => {
  const { log, addLog } = useEventLog();

  return (
    <ExamplesPanel footer={<EventLog entries={log} />}>
      <ExampleSection title="Default" description="Drag to slide the jelly blob. Requires WebGPU.">
        <JellySlider onChange={(v) => addLog(`Value: ${(v * 100).toFixed(0)}%`)} />
      </ExampleSection>
      <ExampleSection title="Custom Colors">
        <JellySlider
          color={[1.0, 0.3, 0.5]}
          glowTint={[1.0, 0.2, 0.4]}
          width={350}
          onChange={(v) => addLog(`Pink: ${(v * 100).toFixed(0)}%`)}
        />
      </ExampleSection>
      <ExampleSection title="Compact">
        <JellySlider
          color={[0.2, 0.9, 0.5]}
          glowTint={[0.1, 0.8, 0.4]}
          width={250}
          height={100}
          onChange={(v) => addLog(`Green: ${(v * 100).toFixed(0)}%`)}
        />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "JellySlider",
  category: "Inputs",
  description: "WebGPU-powered slider with a physics-based jelly blob that deforms as you drag it.",
  component: JellySlider,
  playgroundConfig,
  extraProps,
  examples: <JellySliderExamples />,
});
