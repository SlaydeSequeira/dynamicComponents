import HdHillsSvg from "../hd/HdHillsSvg";
import { HdSkyLayers, HdTreeLeaves } from "../hd/HdLayers";

const DefaultHillsSvg = () => (
  <svg className="cob-hills" viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,60 C60,50 118,55 180,49 C242,43 300,52 360,47 L360,68 L0,68 Z" fill="#c2e4c6" />
    <path d="M0,64 C52,53 96,52 142,58 C188,64 232,49 286,55 C322,59 346,60 360,56 L360,68 L0,68 Z" fill="#9bd183" />
    <path d="M0,66 C56,61 102,60 152,63 C206,66 246,57 300,61 C330,63 348,64 360,62 L360,70 L0,70 Z" fill="#7cbd65" />
  </svg>
);

export function Scene({
  sceneActive,
  mode,
  highDefinition,
}: {
  sceneActive: boolean;
  mode: string;
  highDefinition: boolean;
}) {
  return (
    <span className={`cob-sky ${sceneActive ? "active" : ""}`} aria-hidden="true">
      {highDefinition && <HdSkyLayers />}
      {mode === "night" ? (
        <svg className="cob-moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <span className="cob-sun" />
      )}
      <span className="cob-stars" />
      <span className="cob-cloud c1" />
      <span className="cob-cloud c2" />
      {highDefinition ? <HdHillsSvg /> : <DefaultHillsSvg />}
      <span className="cob-tree t1">
        <i className="canopy" />
        {highDefinition && <HdTreeLeaves />}
        <i className="trunk" />
      </span>
      <span className="cob-tree t2">
        <i className="canopy" />
        {highDefinition && <HdTreeLeaves />}
        <i className="trunk" />
      </span>
      <span className="cob-tree t3">
        <i className="canopy" />
        {highDefinition && <HdTreeLeaves compact />}
        <i className="trunk" />
      </span>
      <span className="cob-ground" />
      <span className="cob-road" />
    </span>
  );
}
