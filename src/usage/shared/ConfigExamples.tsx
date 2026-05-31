import { createElement, type ComponentType } from "react";
import { ExampleSection, ExamplesPanel } from "./ExampleSection";
import type { ExampleConfig } from "./types";

interface ConfigExamplesProps {
  readonly component: ComponentType<Record<string, unknown>>;
  readonly sections: readonly ExampleConfig[];
}

export const ConfigExamples = ({ component, sections }: ConfigExamplesProps) => (
  <ExamplesPanel>
    {sections.map((section) => (
      <ExampleSection
        key={section.title}
        title={section.title}
        description={section.description}
        layout={section.layout}
        gap={section.gap}
        padding={section.padding}
      >
        {section.items.map((item, index) =>
          createElement(component, { key: index, ...item.props }, item.children)
        )}
      </ExampleSection>
    ))}
  </ExamplesPanel>
);
