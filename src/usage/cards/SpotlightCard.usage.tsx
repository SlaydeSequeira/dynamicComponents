import SpotlightCard from "../../components/cards/spotlightCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const SpotlightCardWithContent = (props: Record<string, unknown>) => (
  <SpotlightCard {...props}>
    <div style={{ textAlign: "center", padding: 32, fontSize: 18, color: "#fff" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>&#128526;</div>
      <div style={{ fontWeight: 600 }}>Hidden Content</div>
      <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>Move your cursor to reveal</div>
    </div>
  </SpotlightCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 250, max: 600, default: 350, description: "Card width in px" },
  { propName: "height", type: "slider", min: 150, max: 400, default: 220, description: "Card height in px" },
  { propName: "spotlightSize", type: "slider", min: 60, max: 250, default: 120, description: "Spotlight radius in px" },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Card content revealed by the spotlight" },
  { prop: "spotlightColor", type: "string", default: "rgba(255,255,255,0.15)", description: "Spotlight glow color" },
];

const SpotlightCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Default" description="Move cursor over the card to reveal content.">
      <SpotlightCard width={350} height={220}>
        <div style={{ textAlign: "center", padding: 32, color: "#fff" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>&#127775;</div>
          <div style={{ fontWeight: 600 }}>Secret Message</div>
        </div>
      </SpotlightCard>
    </ExampleSection>
    <ExampleSection title="Large Spotlight" description="Wider reveal area.">
      <SpotlightCard width={350} height={220} spotlightSize={200}>
        <div style={{ textAlign: "center", padding: 32, color: "#fff" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>&#128270;</div>
          <div style={{ fontWeight: 600 }}>Easier to find</div>
        </div>
      </SpotlightCard>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "SpotlightCard",
  category: "Cards",
  description: "A card whose content is hidden in darkness and revealed by a cursor-following spotlight.",
  component: SpotlightCardWithContent,
  playgroundConfig,
  extraProps,
  examples: <SpotlightCardExamples />,
});
