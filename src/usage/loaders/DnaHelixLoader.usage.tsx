import DnaHelixLoader from "../../components/loaders/dnaHelixLoader";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  { propName: "size", type: "slider", min: 60, max: 200, default: 120, description: "Overall size in px" },
  { propName: "pairs", type: "slider", min: 4, max: 16, default: 10, description: "Number of dot pairs" },
  { propName: "colorA", type: "hex", default: "#7cb3f5", description: "Strand A color" },
  { propName: "colorB", type: "hex", default: "#f5a623", description: "Strand B color" },
  { propName: "speed", type: "slider", min: 1, max: 5, default: 2.5, step: 0.5, description: "Cycle duration in seconds" },
];

const DnaHelixLoaderExamples = () => (
  <ExamplesPanel>
    <ExampleSection title="Default" description="Two intertwined strands with staggered 3D rotation.">
      <DnaHelixLoader />
    </ExampleSection>
    <ExampleSection title="Custom Colors">
      <DnaHelixLoader colorA="#e74c8b" colorB="#a78bfa" />
      <DnaHelixLoader colorA="#58d499" colorB="#f5d442" />
    </ExampleSection>
    <ExampleSection title="Sizes">
      <DnaHelixLoader size={60} pairs={6} />
      <DnaHelixLoader size={120} />
      <DnaHelixLoader size={180} pairs={14} />
    </ExampleSection>
    <ExampleSection title="Fast Spin">
      <DnaHelixLoader speed={1.2} colorA="#ff6b6b" colorB="#4ecdc4" />
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "DnaHelixLoader",
  category: "Loaders",
  description: "DNA double-helix loader with two intertwined strands rotating in 3D with staggered phase offsets.",
  component: DnaHelixLoader,
  playgroundConfig,
  exampleConfigs: [
    { title: "Default", items: [{}] },
    {
      title: "Pink & Purple",
      items: [{ props: { colorA: "#e74c8b", colorB: "#a78bfa", size: 140 } }],
    },
  ],
  examples: <DnaHelixLoaderExamples />,
});
