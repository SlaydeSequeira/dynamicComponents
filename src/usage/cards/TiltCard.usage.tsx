import TiltCard from "../../components/cards/tiltCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { cardFaceStyle } from "../shared/types";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const TiltCardWithContent = (props: Record<string, unknown>) => (
  <TiltCard {...props}>
    <div style={cardFaceStyle("#1e293b")}>Hover &amp; tilt me</div>
  </TiltCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300, description: "Card width in px" },
  { propName: "height", type: "slider", min: 150, max: 400, default: 200, description: "Card height in px" },
  { propName: "maxTilt", type: "slider", min: 5, max: 30, default: 15, description: "Max tilt in degrees" },
  { propName: "glare", type: "toggle", default: true, description: "Show glare overlay on hover" },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Card content" },
];

const TiltCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="With Glare" description="Hover to see the tilt and glare effect.">
      <TiltCard width={300} height={200} glare>
        <div style={cardFaceStyle("#1e293b")}>Glare enabled</div>
      </TiltCard>
    </ExampleSection>
    <ExampleSection title="Without Glare">
      <TiltCard width={300} height={200} glare={false} maxTilt={25}>
        <div style={cardFaceStyle("#7c3aed")}>No glare, more tilt</div>
      </TiltCard>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "TiltCard",
  category: "Cards",
  description: "A card that tilts toward the cursor with optional glare effect.",
  component: TiltCardWithContent,
  playgroundConfig,
  extraProps,
  examples: <TiltCardExamples />,
});
