interface HdTreeLeavesProps {
  readonly compact?: boolean;
}

export const HdTreeLeaves = ({ compact = false }: HdTreeLeavesProps) => (
  <>
    <i className="cob-hd-leaf l1" />
    <i className="cob-hd-leaf l2" />
    {!compact && <i className="cob-hd-leaf l3" />}
    {!compact && <i className="cob-hd-leaf l4" />}
  </>
);

export const HdSkyLayers = () => (
  <>
    <span className="cob-hd-haze" />
    <span className="cob-hd-sunbeam" />
    <span className="cob-hd-vignette" />
    <span className="cob-hd-cloud c3" />
    <svg className="cob-hd-birds" viewBox="0 0 360 40" aria-hidden="true">
      <path d="M228,14 Q232,11 236,14 Q232,17 228,14" fill="#2a4050" opacity="0.35" />
      <path d="M234,12 Q237,9 240,12 Q237,15 234,12" fill="#2a4050" opacity="0.3" />
      <path d="M310,18 Q313,15 316,18 Q313,21 310,18" fill="#2a4050" opacity="0.28" />
    </svg>
    <span className="cob-hd-tree-shadow s1" />
    <span className="cob-hd-tree-shadow s2" />
    <span className="cob-hd-tree-shadow s3" />
    <span className="cob-hd-grass" />
    <span className="cob-hd-pebbles" />
    <span className="cob-hd-road-texture" />
  </>
);

export const HdPackageLayers = () => (
  <>
    <span className="cob-hd-label" />
    <span className="cob-hd-fragile" />
  </>
);

export const HdBodyLayers = () => (
  <>
    <span className="cob-hd-rivets" />
    <span className="cob-hd-reflect-strip" />
    <span className="cob-hd-panel-shade" />
  </>
);

export const HdCabLayers = () => (
  <>
    <span className="cob-hd-roof" />
    <span className="cob-hd-wiper" />
    <span className="cob-hd-marker" />
    <span className="cob-hd-antenna" />
    <span className="cob-hd-foglamp" />
    <span className="cob-hd-vent" />
  </>
);

export const HdWindowLayers = () => <span className="cob-hd-dash" />;

export const HdRearAssembly = () => (
  <span className="cob-hd-rear-bumper" aria-hidden="true">
    <span className="cob-hd-tail-light" />
    <span className="cob-hd-tail-light t2" />
    <span className="cob-hd-exhaust-stack" />
  </span>
);

export const HdTruckLayers = () => (
  <>
    <span className="cob-hd-undercarriage" />
    <span className="cob-hd-mudflap f1" />
    <span className="cob-hd-mudflap f2" />
    <span className="cob-hd-chrome-trim" />
  </>
);

export const HdSmokeExtra = () => (
  <>
    <i />
    <i />
  </>
);
