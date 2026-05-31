import { useState } from "react";
import LiquidCheckbox from "../../components/inputs/liquidCheckbox";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "checked",
    type: "toggle",
    default: false,
    linkedOnChange: "onChange",
    description: "Controlled checked state",
  },
  { propName: "size", type: "slider", min: 24, max: 64, default: 32, description: "Checkbox size in px" },
  { propName: "color", type: "hex", default: "#7cb3f5", description: "Fill color when checked" },
  { propName: "label", type: "text", default: "Accept terms", description: "Label text" },
];

const extraProps = [
  { prop: "onChange", type: "(checked: boolean) => void", default: "—", description: "Fires on toggle" },
];

const LiquidCheckboxExamples = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <ExamplesPanel>
      <ExampleSection title="Default" description="Click to toggle.">
        <LiquidCheckbox checked={checked1} onChange={setChecked1} label="Accept terms" />
      </ExampleSection>
      <ExampleSection title="Pre-checked, large">
        <LiquidCheckbox checked={checked2} onChange={setChecked2} size={48} color="#e74c3c" label="Subscribe" />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "LiquidCheckbox",
  category: "Inputs",
  description: "Checkbox with liquid fill animation.",
  component: LiquidCheckbox,
  playgroundConfig,
  extraProps,
  examples: <LiquidCheckboxExamples />,
});
