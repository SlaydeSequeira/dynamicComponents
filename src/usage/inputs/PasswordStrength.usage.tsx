import { useState } from "react";
import PasswordStrength from "../../components/inputs/passwordStrength";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 400, default: 300, description: "Input width in px" },
  {
    propName: "placeholder",
    type: "text",
    default: "Enter password...",
    description: "Input placeholder text",
  },
];

const extraProps = [
  { prop: "value", type: "string", default: "—", description: "Controlled password value" },
  { prop: "onChange", type: "(value: string) => void", default: "—", description: "Fires on input change" },
];

const PasswordStrengthExamples = () => {
  const [pw, setPw] = useState("");

  return (
    <ExamplesPanel>
      <ExampleSection title="Default" description="Type a password to see the strength meter.">
        <PasswordStrength value={pw} onChange={setPw} />
      </ExampleSection>
      <ExampleSection title="Wide with custom placeholder">
        <PasswordStrength width={380} placeholder="Create a strong password..." />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "PasswordStrength",
  category: "Inputs",
  description: "Password input with real-time strength indicator.",
  component: PasswordStrength,
  playgroundConfig,
  extraProps,
  examples: <PasswordStrengthExamples />,
});
