import ScratchCard from "../../components/cards/scratchCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { cardFaceStyle } from "../shared/types";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const ScratchCardWithContent = (props: Record<string, unknown>) => (
  <ScratchCard {...props} />
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 200, max: 500, default: 300, description: "Card width in px" },
  { propName: "height", type: "slider", min: 100, max: 300, default: 180, description: "Card height in px" },
  { propName: "overlayColor", type: "hex", default: "#888888", description: "Scratch overlay color", docDefault: "#888" },
  {
    propName: "internalColor",
    type: "hex",
    default: "#065f46",
    description: "Revealed content background color",
  },
  {
    propName: "outerText",
    type: "text",
    default: "Scratch here!",
    description: "Hint text on the scratch overlay",
  },
  {
    propName: "innerText",
    type: "text",
    default: "You won $50!",
    description: "Text revealed underneath",
  },
  { propName: "brushSize", type: "slider", min: 10, max: 50, default: 25, description: "Brush radius in px" },
  { propName: "revealAt", type: "slider", min: 20, max: 80, default: 50, description: "% scratched to auto-reveal" },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Custom revealed content (overrides innerText / internalColor)" },
  { prop: "onReveal", type: "() => void", default: "—", description: "Fires when card is revealed" },
];

const ScratchCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Prize Card" description="Scratch the overlay to reveal the prize underneath.">
      <ScratchCard width={300} height={180} />
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
