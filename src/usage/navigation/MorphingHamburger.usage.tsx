import { useState } from "react";
import MorphingHamburger from "../../components/navigation/morphingHamburger";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const playgroundConfig: PropConfig[] = [
  {
    propName: "isOpen",
    type: "toggle",
    default: false,
    linkedOnChange: "onChange",
    description: "Controlled open state",
  },
  { propName: "size", type: "slider", min: 24, max: 60, default: 40, description: "Icon size in px" },
  { propName: "color", type: "hex", default: "#ffffff", description: "Line color" },
  { propName: "thickness", type: "slider", min: 2, max: 5, default: 3, description: "Line thickness in px" },
];

const extraProps = [
  { prop: "onChange", type: "(isOpen: boolean) => void", default: "—", description: "Fires on click with new state" },
];

const MorphingHamburgerExamples = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  return (
    <ExamplesPanel>
      <ExampleSection title="Default" description="Click to morph between hamburger and close.">
        <MorphingHamburger isOpen={open1} onChange={setOpen1} />
      </ExampleSection>
      <ExampleSection title="Large, colored, thick">
        <MorphingHamburger isOpen={open2} onChange={setOpen2} size={56} color="#e74c3c" thickness={4} />
      </ExampleSection>
    </ExamplesPanel>
  );
};

export default createUsageEntry({
  title: "MorphingHamburger",
  category: "Navigation",
  description: "Hamburger icon that morphs into a close icon.",
  component: MorphingHamburger,
  playgroundConfig,
  extraProps,
  examples: <MorphingHamburgerExamples />,
});
