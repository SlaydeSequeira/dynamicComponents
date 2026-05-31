import { useState } from "react";
import LightBulbToggle from "../../components/buttons/lightBulbToggle";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "isOn",
    type: "toggle",
    default: false,
    linkedOnChange: "onChange",
    description: "Controlled state — true = light on",
  },
  {
    propName: "scale",
    type: "slider",
    min: 0.5,
    max: 3,
    default: 1,
    description: "Size multiplier",
  },
];

const extraProps = [
  {
    prop: "onChange",
    type: "(isOn: boolean) => void",
    default: "—",
    description: "Fires on toggle with the new state",
  },
];

const LightBulbToggleExamples = () => {
  const [on1, setOn1] = useState(false);
  const [on2, setOn2] = useState(true);

  return (
    <ExamplesPanel>
      <ExampleSection
        title="Default"
        description="Click or drag the pull cord in any direction — swing sideways or pull down to toggle. Physics simulate a real hanging cord."
      >
        <div style={{ background: "#1a1a2e", padding: 40, borderRadius: 12 }}>
          <LightBulbToggle isOn={on1} onChange={setOn1} />
        </div>
      </ExampleSection>
      <ExampleSection title="Starting On">
        <div style={{ background: "#1a1a2e", padding: 40, borderRadius: 12 }}>
          <LightBulbToggle isOn={on2} onChange={setOn2} />
        </div>
      </ExampleSection>
      <ExampleSection
        title="Sizes"
        description={
          <>
            <code>scale={"0.7"}</code>, <code>scale={"1"}</code>,{" "}
            <code>scale={"1.8"}</code>
          </>
        }
        layout="row"
        gap={48}
      >
        <div
          style={{
            background: "#1a1a2e",
            padding: "40px 32px",
            borderRadius: 12,
            display: "flex",
            gap: 48,
            alignItems: "flex-start",
          }}
        >
          <LightBulbToggle scale={0.7} />
          <LightBulbToggle scale={1} />
          <LightBulbToggle scale={1.8} />
        </div>
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "LightBulbToggle",
  category: "Buttons",
  description:
    "Pull-string light bulb toggle with 2D pendulum physics. Swing or pull the cord in any direction to switch on/off.",
  component: LightBulbToggle,
  playgroundConfig,
  extraProps,
  examples: <LightBulbToggleExamples />,
});
