import HolographicCard from "../../components/cards/holographicCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { cardFaceStyle } from "../shared/types";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const HolographicCardWithContent = (props: Record<string, unknown>) => (
  <HolographicCard {...props}>
    <div style={cardFaceStyle("transparent", "#fff", 18, 600)}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>&#9733;</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>HOLOGRAPHIC</div>
        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>RARE CARD</div>
      </div>
    </div>
  </HolographicCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300, description: "Card width in px" },
  { propName: "height", type: "slider", min: 200, max: 500, default: 400, description: "Card height in px" },
  { propName: "intensity", type: "slider", min: 0.1, max: 1, default: 0.5, step: 0.05, description: "Holographic effect intensity" },
  { propName: "tilt", type: "toggle", default: true, description: "Enable 3D tilt on hover" },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Card content" },
];

const HolographicCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Default" description="Hover to see the rainbow holographic shimmer.">
      <HolographicCard width={260} height={360}>
        <div style={cardFaceStyle("transparent", "#fff", 16)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>&#9733;</div>
            <div style={{ fontWeight: 700 }}>HOLOGRAPHIC</div>
          </div>
        </div>
      </HolographicCard>
    </ExampleSection>
    <ExampleSection title="High Intensity, No Tilt" description="Maximum shimmer, no 3D tilt.">
      <HolographicCard width={260} height={360} intensity={1} tilt={false}>
        <div style={cardFaceStyle("transparent", "#fff", 16)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>&#128142;</div>
            <div style={{ fontWeight: 700 }}>MAX SHIMMER</div>
          </div>
        </div>
      </HolographicCard>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "HolographicCard",
  category: "Cards",
  description: "A card with a rainbow holographic shimmer effect that follows the cursor, inspired by trading cards.",
  component: HolographicCardWithContent,
  playgroundConfig,
  extraProps,
  examples: <HolographicCardExamples />,
});
