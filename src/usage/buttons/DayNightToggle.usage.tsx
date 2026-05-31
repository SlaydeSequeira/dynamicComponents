import { useState } from "react";
import DayNightToggle from "../../components/buttons/dayNightToggle";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "isNight",
    type: "toggle",
    default: false,
    linkedOnChange: "onChange",
    description: "Controlled state — true = night",
  },
  { propName: "scale", type: "slider", min: 0.5, max: 3, default: 1, description: "Size multiplier (1 = 140×64px)" },
];

const extraProps = [
  { prop: "onChange", type: "(isNight: boolean) => void", default: "—", description: "Fires on toggle with the new state" },
];

const DayNightToggleExamples = () => {
  const [night1, setNight1] = useState(false);
  const [night2, setNight2] = useState(true);

  return (
    <ExamplesPanel>
      <ExampleSection title="Default" description="Click to toggle between day and night.">
        <DayNightToggle isNight={night1} onChange={setNight1} />
      </ExampleSection>
      <ExampleSection title="Starting at Night">
        <DayNightToggle isNight={night2} onChange={setNight2} />
      </ExampleSection>
      <ExampleSection
        title="Sizes"
        description={
          <>
            <code>scale={"0.7"}</code>, <code>scale={"1"}</code>, <code>scale={"1.5"}</code>
          </>
        }
        layout="row"
        gap={24}
      >
        <DayNightToggle scale={0.7} />
        <DayNightToggle scale={1} />
        <DayNightToggle scale={1.5} />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "DayNightToggle",
  category: "Buttons",
  description: "Animated toggle switch with sun/moon knob, clouds, and stars.",
  component: DayNightToggle,
  playgroundConfig,
  extraProps,
  examples: <DayNightToggleExamples />,
});
