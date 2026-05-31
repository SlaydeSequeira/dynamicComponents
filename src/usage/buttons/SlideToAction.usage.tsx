import SlideToAction from "../../components/buttons/slideToAction";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { EventLog, useEventLog } from "../shared/EventLog";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  { propName: "label", type: "text", default: "Book a call", description: "Resting text" },
  { propName: "completedLabel", type: "text", default: "Booked!", description: "Text shown after completion" },
  { propName: "accentColor", type: "hex", default: "#a8e020", description: "Knob color" },
  {
    propName: "threshold",
    type: "slider",
    min: 0.5,
    max: 1,
    default: 0.8,
    step: 0.05,
    propType: "number (0-1)",
    description: "Slide distance to trigger",
  },
  { propName: "width", type: "slider", min: 200, max: 500, default: 320, description: "Width in px" },
  { propName: "height", type: "slider", min: 50, max: 120, default: 80, description: "Height in px" },
  { propName: "autoReset", type: "toggle", default: true, description: "Reset after completion" },
];

const extraProps = [
  { prop: "icon", type: "ReactNode", default: "Dotted arrow", description: "Custom icon inside knob" },
  { prop: "onComplete", type: "() => void", default: "—", description: "Fires on successful slide" },
];

const SlideToActionExamples = () => {
  const { log, addLog } = useEventLog();

  return (
    <ExamplesPanel footer={<EventLog entries={log} />}>
      <ExampleSection title="Default" description="Slide the green knob right to confirm.">
        <SlideToAction onComplete={() => addLog("Default completed")} />
      </ExampleSection>
      <ExampleSection title="Custom Labels + Color">
        <SlideToAction
          label="Confirm Payment"
          completedLabel="Paid!"
          accentColor="#4fc3f7"
          onComplete={() => addLog("Payment confirmed")}
        />
      </ExampleSection>
      <ExampleSection title="Sizes" layout="column">
        <SlideToAction width={240} height={60} label="Small" onComplete={() => addLog("Small completed")} />
        <SlideToAction onComplete={() => addLog("Default completed")} />
        <SlideToAction width={420} height={100} label="Large" onComplete={() => addLog("Large completed")} />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "SlideToAction",
  category: "Buttons",
  description: "Drag-to-confirm button with glossy dark pill and sliding green knob.",
  component: SlideToAction,
  playgroundConfig,
  extraProps,
  examples: <SlideToActionExamples />,
});
