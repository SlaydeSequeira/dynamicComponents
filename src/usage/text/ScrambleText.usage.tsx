import ScrambleText from "../../components/text/scrambleText";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const ScrambleTextPlayground = (props: Record<string, unknown>) => (
  <ScrambleText text="Hover to decode" {...props} />
);

const playgroundConfig: PropConfig[] = [
  { propName: "text", type: "text", default: "Hover to decode", description: "Text to display and scramble" },
  { propName: "speed", type: "slider", min: 20, max: 120, default: 50, description: "Scramble speed (ms per tick)" },
  { propName: "fontSize", type: "slider", min: 14, max: 48, default: 24, description: "Font size in px" },
  { propName: "trigger", type: "dropdown", options: ["hover", "click", "auto"], default: "hover", description: "What triggers the scramble" },
];

const ScrambleTextExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Hover Trigger" description="Hover over the text to scramble and decode.">
      <ScrambleText text="HOVER TO DECODE" fontSize={28} />
    </ExampleSection>
    <ExampleSection title="Click Trigger">
      <ScrambleText text="Click me to scramble" trigger="click" fontSize={22} color="#7cb3f5" />
    </ExampleSection>
    <ExampleSection title="Slow Speed">
      <ScrambleText text="S L O W  D E C O D E" speed={100} fontSize={20} color="#58d499" />
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "ScrambleText",
  category: "Text",
  description: "Text that scrambles through random characters before resolving, like a cipher decoding.",
  component: ScrambleTextPlayground,
  playgroundConfig,
  examples: <ScrambleTextExamples />,
});
