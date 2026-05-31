import type { CSSProperties, ReactNode } from "react";
import GlassCard from "../../components/cards/glassCard";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const demoBackdropStyle = (background: string): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 280,
  padding: 32,
  borderRadius: 16,
  background,
});

const DemoBackdrop = ({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) => <div style={demoBackdropStyle(background)}>{children}</div>;

const sampleContent = (
  <>
    <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600 }}>Glass Card</h3>
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, opacity: 0.85 }}>
      Frosted translucent surface with backdrop blur and a soft edge highlight.
    </p>
  </>
);

const GlassCardWithBackdrop = (props: Record<string, unknown>) => (
  <DemoBackdrop background="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)">
    <GlassCard {...props}>{sampleContent}</GlassCard>
  </DemoBackdrop>
);

const playgroundConfig: PropConfig[] = [
  { propName: "width", type: "slider", min: 220, max: 480, default: 320, description: "Card width in px" },
  { propName: "height", type: "slider", min: 120, max: 360, default: 200, description: "Minimum card height in px" },
  { propName: "blur", type: "slider", min: 4, max: 40, default: 16, description: "Backdrop blur strength" },
  { propName: "opacity", type: "slider", min: 0.05, max: 0.45, default: 0.18, description: "Surface opacity (0–1)" },
  { propName: "borderRadius", type: "slider", min: 8, max: 32, default: 20, description: "Corner radius in px" },
  { propName: "padding", type: "slider", min: 12, max: 48, default: 24, description: "Inner padding in px" },
  {
    propName: "variant",
    type: "dropdown",
    options: ["light", "dark"],
    default: "light",
    propType: '"light" | "dark"',
    description: "Light or dark glass tint",
  },
];

const extraProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Card content" },
  { prop: "className", type: "string", default: '""', description: "Extra CSS class names" },
  { prop: "style", type: "CSSProperties", default: "—", description: "Inline styles merged onto the card" },
];

const GlassCardExamples = () => (
  <ExamplesPanel>
    <ExampleSection
      title="Light on gradient"
      description="Default light glass over a colorful background."
    >
      <DemoBackdrop background="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)">
        <GlassCard>
          <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Welcome back</h3>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>Your dashboard is ready.</p>
        </GlassCard>
      </DemoBackdrop>
    </ExampleSection>

    <ExampleSection
      title="Dark glass"
      description="Darker tint for richer backgrounds."
    >
      <DemoBackdrop background="radial-gradient(circle at 20% 20%, #1e3a5f, #0f172a 70%)">
        <GlassCard variant="dark" blur={20} opacity={0.12}>
          <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Night mode</h3>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>Subtle frosted panel.</p>
        </GlassCard>
      </DemoBackdrop>
    </ExampleSection>

    <ExampleSection
      title="Heavy frost"
      description="Higher blur and lower opacity for a more translucent look."
    >
      <DemoBackdrop background="linear-gradient(160deg, #ff6b6b, #feca57, #48dbfb)">
        <GlassCard blur={28} opacity={0.1} borderRadius={24} width={340}>
          <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Heavy frost</h3>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>More blur, less fill.</p>
        </GlassCard>
      </DemoBackdrop>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "GlassCard",
  category: "Cards",
  description: "A translucent frosted-glass card with backdrop blur, soft borders, and light or dark tint.",
  component: GlassCardWithBackdrop,
  playgroundConfig,
  extraProps,
  examples: <GlassCardExamples />,
});
