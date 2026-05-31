import FlipCard from "../../components/cards/flipCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { cardFaceStyle } from "../shared/types";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const frontFace = (label: string, bg: string) => (
  <div style={cardFaceStyle(bg)}>{label}</div>
);

const FlipCardWithContent = (props: Record<string, unknown>) => (
  <FlipCard
    front={frontFace("Front Side", "#1e293b")}
    back={frontFace("Back Side", "#7c3aed")}
    {...props}
  />
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300, description: "Card width in px" },
  { propName: "height", type: "slider", min: 150, max: 400, default: 200, description: "Card height in px" },
  {
    propName: "direction",
    type: "dropdown",
    options: ["horizontal", "vertical"],
    default: "horizontal",
    propType: '"horizontal" | "vertical"',
    description: "Flip axis",
  },
  {
    propName: "trigger",
    type: "dropdown",
    options: ["hover", "click"],
    default: "hover",
    propType: '"hover" | "click"',
    description: "How the flip is triggered",
  },
];

const extraProps = [
  { prop: "front", type: "ReactNode", default: "—", description: "Content for the front face" },
  { prop: "back", type: "ReactNode", default: "—", description: "Content for the back face" },
];

const FlipCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Horizontal Flip (hover)" description="Hover to flip horizontally.">
      <FlipCard
        direction="horizontal"
        trigger="hover"
        front={frontFace("Front", "#1e293b")}
        back={frontFace("Back", "#7c3aed")}
      />
    </ExampleSection>
    <ExampleSection title="Vertical Flip (click)" description="Click to flip vertically.">
      <FlipCard
        direction="vertical"
        trigger="click"
        front={frontFace("Click Me", "#0f766e")}
        back={frontFace("Flipped!", "#b91c1c")}
      />
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "FlipCard",
  category: "Cards",
  description: "A card that flips to reveal back content on hover or click.",
  component: FlipCardWithContent,
  playgroundConfig,
  extraProps,
  examples: <FlipCardExamples />,
});
