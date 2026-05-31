import ScratchCard from "../../components/cards/scratchCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { cardFaceStyle } from "../shared/types";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const prizeFace = (
  <div style={cardFaceStyle("#065f46", "#34d399", 22, 700)}>You won $50!</div>
);

const ScratchCardWithContent = (props: Record<string, unknown>) => (
  <ScratchCard {...props}>{prizeFace}</ScratchCard>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300, description: "Card width in px" },
  { propName: "height", type: "slider", min: 100, max: 300, default: 180, description: "Card height in px" },
  { propName: "overlayColor", type: "hex", default: "#888888", description: "Scratch overlay color", docDefault: "#888" },
  { propName: "brushSize", type: "slider", min: 10, max: 50, default: 25, description: "Brush radius in px" },
  { propName: "revealAt", type: "slider", min: 20, max: 80, default: 50, description: "% scratched to auto-reveal" },
  { propName: "showPercentage", type: "boolean", default: false, description: "Show scratch percentage indicator" },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Content revealed after scratching" },
  { prop: "onReveal", type: "() => void", default: "—", description: "Fires when card is revealed" },
];

const ScratchCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Prize Card" description="Scratch the overlay to reveal the prize underneath.">
      <ScratchCard width={300} height={180}>{prizeFace}</ScratchCard>
    </ExampleSection>
    <ExampleSection title="Custom Overlay">
      <ScratchCard width={280} height={160} overlayColor="#c084fc" brushSize={35} revealAt={40}>
        <div style={cardFaceStyle("#1e1b4b", "#e0e7ff", 20, 700)}>Secret Message</div>
      </ScratchCard>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "ScratchCard",
  category: "Cards",
  description: "Scratch-off overlay that reveals hidden content underneath.",
  component: ScratchCardWithContent,
  playgroundConfig,
  extraProps,
  examples: <ScratchCardExamples />,
});
