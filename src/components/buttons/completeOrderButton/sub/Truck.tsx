import { PHASES } from "../utils";
import {
  HdBodyLayers,
  HdCabLayers,
  HdPackageLayers,
  HdRearAssembly,
  HdSmokeExtra,
  HdTruckLayers,
  HdWindowLayers,
} from "../hd/HdLayers";

interface TruckProps {
  showTruck: boolean;
  phase: string;
  doorsOpen: boolean;
  pkgVisible: boolean;
  pkgLoading: boolean;
  pkgGone: boolean;
  lightsOn: boolean;
  smokeOn: boolean;
  highDefinition: boolean;
}

export function Truck({
  showTruck,
  phase,
  doorsOpen,
  pkgVisible,
  pkgLoading,
  pkgGone,
  lightsOn,
  smokeOn,
  highDefinition,
}: TruckProps) {
  return (
    <span
      className={`cob-truck ${showTruck ? "in" : ""} ${phase === PHASES.LEAVE ? "leave" : ""} ${lightsOn ? "lights" : ""} ${smokeOn ? "smoking" : ""}`}
    >
      <span className="cob-shadow" />
      <span className="cob-pipe" />
      <span className="cob-smoke">
        <i /> <i /> <i />
        {highDefinition && <HdSmokeExtra />}
      </span>
      <span className="cob-cargo">
        <span className="cob-hold" />
        {highDefinition && <HdRearAssembly />}
        <span className={`cob-package ${pkgVisible ? "show" : ""} ${pkgLoading ? "loading" : ""} ${pkgGone ? "gone" : ""}`}>
          <span className="cob-tape-h" />
          <span className="cob-tape-v" />
          <span className="cob-flap" />
          {highDefinition && <HdPackageLayers />}
        </span>
        <span className="cob-body">
          <span className="cob-stripe" />
          <span className="cob-logo" />
          <span className="cob-seam" />
          {highDefinition && <HdBodyLayers />}
        </span>
        <span className={`cob-door ${doorsOpen ? "open" : ""}`}>
          <span className="cob-handle" />
          {highDefinition && <span className="cob-hd-door-track" />}
          {highDefinition && <span className="cob-hd-hinge" />}
        </span>
      </span>
      <span className="cob-cab">
        <span className="cob-window">
          {highDefinition && <HdWindowLayers />}
        </span>
        <span className="cob-grille" />
        <span className="cob-headlight" />
        <span className="cob-mirror" />
        {highDefinition && <HdCabLayers />}
      </span>
      <span className="cob-bumper" />
      <span className="cob-beam" />
      {highDefinition && <HdTruckLayers />}
      <span className="cob-fender f1" />
      <span className="cob-fender f2" />
      <span className="cob-wheel w1"><i /></span>
      <span className="cob-wheel w2"><i /></span>
    </span>
  );
}
