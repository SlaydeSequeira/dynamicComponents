import CompleteOrderButton from "../../components/buttons/completeOrderButton";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { EventLog, useEventLog } from "../shared/EventLog";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "highDefinition",
    type: "toggle",
    default: false,
    description: "Ultra-detailed truck, trees, and scenery",
  },
  {
    propName: "mode",
    type: "dropdown",
    options: ["day", "night"],
    default: "day",
    propType: '"day" | "night"',
    description: "Scene theme",
  },
  { propName: "truckColor", type: "hex", default: "#2f57e6", description: "Cab / accent color" },
  { propName: "truckSecondaryColor", type: "hex", default: "#f5f7fc", description: "Cargo body color" },
  { propName: "boxColor", type: "hex", default: "#e0ad58", description: "Package color" },
  {
    propName: "speed",
    type: "slider",
    min: 1,
    max: 100,
    default: 50,
    propType: "number (1-100)",
    description: "Animation speed multiplier",
  },
  { propName: "label", type: "text", default: "Complete Order", description: "Resting button text" },
  { propName: "successLabel", type: "text", default: "Order Placed", description: "Done state text" },
  {
    propName: "shouldHeadlightComeOn",
    type: "toggle",
    default: true,
    description: "Headlight glow on departure",
  },
  {
    propName: "shouldExhaustReleaseSmoke",
    type: "toggle",
    default: true,
    description: "Exhaust smoke on departure",
  },
  { propName: "autoReset", type: "toggle", default: true, description: "Auto-reset to idle after done" },
];

const extraProps = [
  { prop: "onComplete", type: "() => void", default: "—", description: "Fires when animation finishes" },
];

const CompleteOrderButtonExamples = () => {
  const { log, addLog } = useEventLog();

  return (
    <ExamplesPanel footer={<EventLog entries={log} />}>
      <ExampleSection title="Default (Day Mode)" description="No props needed." padding={24}>
        <CompleteOrderButton onComplete={() => addLog("Day mode completed")} />
      </ExampleSection>
      <ExampleSection title="Night Mode" padding={24}>
        <CompleteOrderButton mode="night" onComplete={() => addLog("Night mode completed")} />
      </ExampleSection>
      <ExampleSection title="High Definition (Day)" description="Turn on highDefinition for the full detail pass." padding={24}>
        <CompleteOrderButton highDefinition onComplete={() => addLog("HD day completed")} />
      </ExampleSection>
      <ExampleSection title="High Definition (Night)" padding={24}>
        <CompleteOrderButton highDefinition mode="night" onComplete={() => addLog("HD night completed")} />
      </ExampleSection>
      <ExampleSection title="Custom Colors" padding={24}>
        <CompleteOrderButton
          truckColor="#e63946"
          truckSecondaryColor="#f1faee"
          boxColor="#a8dadc"
          onComplete={() => addLog("Custom color completed")}
        />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "CompleteOrderButton",
  category: "Buttons",
  description: "Pill-shaped delivery button with truck animation.",
  component: CompleteOrderButton,
  playgroundConfig,
  extraProps,
  examples: <CompleteOrderButtonExamples />,
});
