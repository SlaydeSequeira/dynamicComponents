import PaperAirplaneSend from "../../components/buttons/paperAirplaneSend";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { EventLog, useEventLog } from "../shared/EventLog";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  { propName: "color", type: "hex", default: "#2563eb", description: "Button background color" },
  { propName: "planeColor", type: "hex", default: "#ffffff", description: "Paper airplane color" },
  {
    propName: "speed",
    type: "slider",
    min: 1,
    max: 100,
    default: 50,
    propType: "number (1-100)",
    description: "Animation speed multiplier",
  },
  { propName: "label", type: "text", default: "Send Message", description: "Resting button text" },
  { propName: "successLabel", type: "text", default: "Sent!", description: "Done state text" },
  { propName: "autoReset", type: "toggle", default: true, description: "Auto-reset to idle after done" },
  { propName: "disabled", type: "toggle", default: false, description: "Disable the button" },
];

const extraProps = [
  { prop: "onSend", type: "() => void", default: "—", description: "Fires when send animation finishes" },
];

const PaperAirplaneSendExamples = () => {
  const { log, addLog } = useEventLog();

  return (
    <ExamplesPanel footer={<EventLog entries={log} />}>
      <ExampleSection title="Default" description="Click to send." padding={24}>
        <PaperAirplaneSend onSend={() => addLog("Message sent!")} />
      </ExampleSection>
      <ExampleSection title="Custom Colors" padding={24}>
        <PaperAirplaneSend
          color="#059669"
          planeColor="#d1fae5"
          label="Submit"
          successLabel="Submitted!"
          onSend={() => addLog("Custom color sent")}
        />
      </ExampleSection>
      <ExampleSection title="Fast Speed" padding={24}>
        <PaperAirplaneSend
          speed={85}
          color="#7c3aed"
          label="Quick Send"
          onSend={() => addLog("Quick send completed")}
        />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "PaperAirplaneSend",
  category: "Buttons",
  description: "Send button with paper airplane fly-away animation.",
  component: PaperAirplaneSend,
  playgroundConfig,
  extraProps,
  examples: <PaperAirplaneSendExamples />,
});
