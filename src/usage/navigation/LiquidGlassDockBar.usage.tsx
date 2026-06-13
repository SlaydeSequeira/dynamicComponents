import type { CSSProperties, ReactNode } from "react";
import LiquidGlassDockBar from "../../components/navigation/liquidGlassDockBar";
import type {
  LiquidGlassDockBarProps,
  DockItem,
} from "../../components/navigation/liquidGlassDockBar";
import type { PropConfig } from "../playground";
import { createUsageEntry } from "../shared/createUsageEntry";
import { ExampleSection, ExamplesPanel } from "../shared/ExampleSection";

const demoItems: DockItem[] = [
  { id: "home", label: "Home", icon: "🏠", active: true },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "files", label: "Files", icon: "📁" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "photos", label: "Photos", icon: "🖼️" },
  { id: "settings", label: "Settings", icon: "⚙️" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

// Liquid glass refracts whatever is behind it, so the demos sit on a colorful
// scene to make the effect visible (a flat dark backdrop would show nothing).
const sceneStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: 16,
  background:
    "radial-gradient(circle at 18% 28%, #5b8cff 0, transparent 42%)," +
    "radial-gradient(circle at 82% 22%, #ff7eb6 0, transparent 38%)," +
    "radial-gradient(circle at 62% 85%, #2dd4bf 0, transparent 44%)," +
    "linear-gradient(135deg, #1b1c3a, #2a1840)",
};

const DockScene = ({ children }: { children: ReactNode }) => (
  <div style={sceneStyle}>{children}</div>
);

const playgroundConfig: PropConfig[] = [
  { propName: "baseSize", type: "slider", min: 32, max: 64, default: 48, description: "Resting icon size in px" },
  { propName: "maxSize", type: "slider", min: 56, max: 120, default: 84, description: "Magnified size at the cursor in px" },
  { propName: "magnification", type: "slider", min: 80, max: 280, default: 160, description: "Cursor influence radius in px" },
  { propName: "gap", type: "slider", min: 4, max: 28, default: 12, description: "Gap between icons in px" },
  { propName: "liquidGlass", type: "toggle", default: true, description: "Refractive liquid-glass material" },
  { propName: "showLabels", type: "toggle", default: true, description: "Show label tooltips on hover" },
  { propName: "bounce", type: "toggle", default: true, description: "Bounce the icon on click" },
  { propName: "accent", type: "hex", default: "#7cb3f5", description: "Accent color for active dot & focus ring" },
];

const extraProps = [
  { prop: "items", type: "DockItem[]", default: "—", description: "Dock entries: { label, icon, id?, active?, onClick? }" },
  { prop: "onItemClick", type: "(item, index) => void", default: "—", description: "Fires when any dock item is clicked" },
];

// Playground only drives primitive props, so inject a fixed item set and a
// colorful scene; the playground-controlled props win via spread.
function LiquidGlassDockBarPlayground(props: Record<string, unknown>) {
  return (
    <DockScene>
      <LiquidGlassDockBar {...(props as Partial<LiquidGlassDockBarProps>)} items={demoItems} />
    </DockScene>
  );
}

const LiquidGlassDockBarExamples = () => (
  <ExamplesPanel>
    <ExampleSection
      title="Liquid glass (default)"
      description="Hover across the dock — icons magnify and the glass refracts the scene, with a glare that follows the cursor."
    >
      <DockScene>
        <LiquidGlassDockBar items={demoItems} />
      </DockScene>
    </ExampleSection>
    <ExampleSection title="Big magnification" description="Larger max size with a wider influence radius.">
      <DockScene>
        <LiquidGlassDockBar items={demoItems} baseSize={44} maxSize={104} magnification={220} />
      </DockScene>
    </ExampleSection>
    <ExampleSection title="Plain glass" description="liquidGlass disabled — classic frosted blur, no refraction.">
      <DockScene>
        <LiquidGlassDockBar items={demoItems.slice(0, 5)} liquidGlass={false} accent="#e07cf5" />
      </DockScene>
    </ExampleSection>
  </ExamplesPanel>
);

export default createUsageEntry({
  title: "LiquidGlassDockBar",
  category: "Navigation",
  description: "macOS-style dock with cursor-proximity magnification and an Apple-style liquid-glass material.",
  component: LiquidGlassDockBar as unknown as React.ComponentType<Record<string, unknown>>,
  playgroundComponent: LiquidGlassDockBarPlayground,
  playgroundConfig,
  extraProps,
  examples: <LiquidGlassDockBarExamples />,
});
