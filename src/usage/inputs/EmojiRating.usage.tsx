import { useState } from "react";
import EmojiRating from "../../components/inputs/emojiRating";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "value",
    type: "slider",
    min: 0,
    max: 1,
    default: 0.5,
    step: 0.001,
    linkedOnChange: "onChange",
    propType: "number (0-1)",
    description: "Continuous rating value",
  },
  { propName: "width", type: "slider", min: 200, max: 500, default: 280, description: "Track width in px" },
  { propName: "emojiSize", type: "slider", min: 32, max: 80, default: 48, description: "Emoji diameter in px" },
];

const extraProps = [
  { prop: "onChange", type: "(value: number) => void", default: "—", description: "Fires on every drag tick" },
];

const EmojiRatingExamples = () => {
  const [val1, setVal1] = useState(0.5);
  const [val2, setVal2] = useState(0);

  return (
    <ExamplesPanel>
      <ExampleSection title="Default" description={`Drag the emoji along the track. Value: ${val1.toFixed(2)}`}>
        <EmojiRating value={val1} onChange={setVal1} />
      </ExampleSection>
      <ExampleSection title="Large" description={`Value: ${val2.toFixed(2)}`}>
        <EmojiRating value={val2} onChange={setVal2} width={400} emojiSize={64} />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "EmojiRating",
  category: "Inputs",
  description: "Continuous emoji slider — face morphs smoothly as you drag.",
  component: EmojiRating,
  playgroundConfig,
  extraProps,
  examples: <EmojiRatingExamples />,
});
