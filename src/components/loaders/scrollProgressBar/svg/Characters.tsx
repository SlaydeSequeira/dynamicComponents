import type { Character } from "../interfaces";

function Snail() {
  return (
    <g className="spb-anim-crawl">
      <ellipse cx="18" cy="26" rx="14" ry="4.5" fill="currentColor" opacity=".6" />
      <ellipse cx="18" cy="25" rx="13" ry="3.5" fill="currentColor" opacity=".85" />
      <ellipse cx="6" cy="27" rx="3" ry="1" fill="currentColor" opacity=".15" />
      <ellipse cx="14" cy="17" rx="9" ry="8.5" fill="currentColor" opacity=".9" />
      <ellipse cx="14" cy="17" rx="7" ry="6.5" fill="currentColor" opacity=".6" />
      <path d="M14,10 C19,10 21,13.5 21,17 C21,20.5 18.5,23 14,23" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" />
      <path d="M14,12.5 C17.5,12.5 19,14.5 19,17 C19,19.5 17,21 14,21" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      <circle cx="14" cy="17" r="2.5" fill="currentColor" opacity=".4" />
      <circle cx="14" cy="17" r="1" fill="rgba(255,255,255,.1)" />
      <ellipse cx="11" cy="13" rx="2.5" ry="1.5" fill="rgba(255,255,255,.12)" transform="rotate(-20 11 13)" />
      <path d="M23,24 Q26,22 28,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".8" />
      <ellipse cx="30" cy="19" rx="3.5" ry="3" fill="currentColor" opacity=".9" />
      <path d="M31,17 Q33,11 35,9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="35.5" cy="8.5" r="2" fill="currentColor" />
      <path d="M29,17 Q30,12 31.5,10.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="32" cy="10" r="1.6" fill="currentColor" />
      <circle cx="36" cy="8.5" r="1" fill="#fff" />
      <circle cx="36.2" cy="8.3" r=".5" fill="#333" />
      <circle cx="32.3" cy="9.8" r=".8" fill="#fff" />
      <circle cx="32.5" cy="9.6" r=".4" fill="#333" />
      <path d="M29,21 Q30.5,22.5 32,21" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".6" strokeLinecap="round" />
    </g>
  );
}

function Car() {
  return (
    <g className="spb-anim-bounce">
      <path d="M3,20 L3,16 Q3,14 5,14 L31,14 Q33,14 33,16 L33,20 Q33,22 31,22 L5,22 Q3,22 3,20 Z" fill="currentColor" />
      <path d="M10,14 L14,7 Q15,5.5 17,5.5 L25,5.5 Q27,5.5 27.5,7 L30,14" fill="currentColor" opacity=".9" />
      <path d="M15,7 L24.5,7 L27,13 L13,13 Z" fill="rgba(135,206,250,.3)" />
      <line x1="20" y1="7" x2="20" y2="13" stroke="currentColor" strokeWidth=".8" opacity=".4" />
      <path d="M13.5,13 L14.5,8 L19.5,8 L19.5,13 Z" fill="rgba(135,206,250,.4)" />
      <path d="M20.5,13 L20.5,8 L24,8 L26.5,13 Z" fill="rgba(135,206,250,.4)" />
      <rect x="6" y="16" width="24" height=".8" rx=".4" fill="rgba(255,255,255,.1)" />
      <circle cx="8" cy="18" r=".5" fill="rgba(255,255,255,.2)" />
      <rect x="33" y="15.5" width="2.5" height="2.5" rx="1" fill="#fde68a" opacity=".9" />
      <rect x="33" y="18.5" width="2" height="1.5" rx=".5" fill="#fde68a" opacity=".5" />
      <rect x="1.5" y="16" width="2" height="2.5" rx=".8" fill="#ef4444" opacity=".8" />
      <rect x="1.5" y="19" width="1.5" height="1" rx=".5" fill="#ef4444" opacity=".5" />
      <g>
        <circle cx="11" cy="23" r="4" fill="#1a1a2e" />
        <circle cx="11" cy="23" r="3" fill="#2a2a3e" />
        <circle cx="11" cy="23" r="1.8" fill="#555" />
        <circle cx="11" cy="23" r=".6" fill="#888" />
      </g>
      <g>
        <circle cx="27" cy="23" r="4" fill="#1a1a2e" />
        <circle cx="27" cy="23" r="3" fill="#2a2a3e" />
        <circle cx="27" cy="23" r="1.8" fill="#555" />
        <circle cx="27" cy="23" r=".6" fill="#888" />
      </g>
      <rect x="30" y="10" width="1.5" height="3" rx=".5" fill="currentColor" opacity=".6" />
    </g>
  );
}

function Truck() {
  return (
    <g className="spb-anim-bounce">
      <rect x="1" y="7" width="22" height="16" rx="2.5" fill="currentColor" opacity=".8" />
      <rect x="1" y="7" width="22" height="3" rx="2.5" fill="currentColor" opacity=".95" />
      <rect x="1" y="7" width="22" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".3" />
      <line x1="8" y1="10" x2="8" y2="23" stroke="rgba(255,255,255,.1)" strokeWidth=".6" />
      <line x1="15" y1="10" x2="15" y2="23" stroke="rgba(255,255,255,.1)" strokeWidth=".6" />
      <rect x="3" y="20" width="5" height="2.5" rx=".8" fill="rgba(255,255,255,.08)" />
      <rect x="10" y="20" width="5" height="2.5" rx=".8" fill="rgba(255,255,255,.08)" />
      <path d="M23,11 L23,23 Q23,24.5 24.5,24.5 L35,24.5 Q36.5,24.5 36.5,23 L36.5,14 Q36.5,11 34,11 Z" fill="currentColor" />
      <path d="M28,12.5 L33,12.5 Q35,12.5 35,14 L35,17 L28,17 Z" fill="rgba(135,206,250,.35)" />
      <line x1="31.5" y1="12.5" x2="31.5" y2="17" stroke="currentColor" strokeWidth=".5" opacity=".3" />
      <rect x="36" y="19" width="2.5" height="2" rx=".8" fill="#fde68a" opacity=".9" />
      <rect x="36" y="21.5" width="2" height="1" rx=".4" fill="#fde68a" opacity=".5" />
      <rect x="0" y="21" width="2.5" height="1.5" rx=".6" fill="#ef4444" opacity=".7" />
      <rect x="0" y="23" width="2" height="2" rx=".6" fill="#555" opacity=".6" />
      <g>
        <circle cx="9" cy="26" r="4" fill="#1a1a2e" />
        <circle cx="9" cy="26" r="3" fill="#2a2a3e" />
        <circle cx="9" cy="26" r="1.8" fill="#555" />
        <circle cx="9" cy="26" r=".6" fill="#888" />
      </g>
      <g>
        <circle cx="31" cy="26" r="4" fill="#1a1a2e" />
        <circle cx="31" cy="26" r="3" fill="#2a2a3e" />
        <circle cx="31" cy="26" r="1.8" fill="#555" />
        <circle cx="31" cy="26" r=".6" fill="#888" />
      </g>
      <rect x="35" y="13" width="1.2" height="2.5" rx=".4" fill="currentColor" opacity=".5" />
    </g>
  );
}

function Rocket() {
  return (
    <g className="spb-anim-wobble">
      <ellipse cx="22" cy="16" rx="13" ry="5.5" fill="currentColor" />
      <ellipse cx="22" cy="14" rx="11" ry="2" fill="rgba(255,255,255,.08)" />
      <path d="M34,16 Q38,14 40,12 L40,16 Z" fill="currentColor" />
      <path d="M34,16 Q38,18 40,20 L40,16 Z" fill="currentColor" opacity=".8" />
      <path d="M38,13 L40,12 L40,14 Z" fill="rgba(255,255,255,.15)" />
      <circle cx="29" cy="16" r="3" fill="rgba(135,206,250,.2)" />
      <circle cx="29" cy="16" r="2.2" fill="rgba(135,206,250,.35)" />
      <circle cx="29.3" cy="15.5" r="1" fill="rgba(255,255,255,.3)" />
      <circle cx="23" cy="16" r="1.5" fill="rgba(135,206,250,.15)" />
      <path d="M12,11 L7,4 L15,11 Z" fill="currentColor" opacity=".8" />
      <path d="M12,21 L7,28 L15,21 Z" fill="currentColor" opacity=".8" />
      <path d="M11,11 L9,6 L13,11 Z" fill="rgba(255,255,255,.1)" />
      <rect x="19" y="11" width="1.5" height="10" rx=".75" fill="rgba(255,255,255,.15)" />
      <rect x="25" y="12" width="1" height="8" rx=".5" fill="rgba(255,255,255,.08)" />
      <g className="spb-flame">
        <path d="M9,12 Q2,16 9,20 Q4,16 9,12 Z" fill="#ef4444" opacity=".9" />
        <path d="M9,13.5 Q4,16 9,18.5 Q5.5,16 9,13.5 Z" fill="#f59e0b" opacity=".95" />
        <path d="M9,14.5 Q6,16 9,17.5 Q7,16 9,14.5 Z" fill="#fde68a" />
        <circle cx="7" cy="16" r=".8" fill="#fff" opacity=".6" />
      </g>
    </g>
  );
}

function Bicycle() {
  return (
    <g className="spb-anim-bob">
      <g>
        <circle cx="10" cy="22" r="6" fill="none" stroke="#555" strokeWidth="1.2" />
        <circle cx="10" cy="22" r="4.5" fill="none" stroke="#444" strokeWidth=".3" />
        <line x1="10" y1="16.5" x2="10" y2="27.5" stroke="#555" strokeWidth=".4" />
        <line x1="4.5" y1="22" x2="15.5" y2="22" stroke="#555" strokeWidth=".4" />
        <line x1="6" y1="18" x2="14" y2="26" stroke="#555" strokeWidth=".4" />
        <line x1="14" y1="18" x2="6" y2="26" stroke="#555" strokeWidth=".4" />
        <circle cx="10" cy="22" r="1.2" fill="currentColor" />
      </g>
      <g>
        <circle cx="30" cy="22" r="6" fill="none" stroke="#555" strokeWidth="1.2" />
        <circle cx="30" cy="22" r="4.5" fill="none" stroke="#444" strokeWidth=".3" />
        <line x1="30" y1="16.5" x2="30" y2="27.5" stroke="#555" strokeWidth=".4" />
        <line x1="24.5" y1="22" x2="35.5" y2="22" stroke="#555" strokeWidth=".4" />
        <line x1="26" y1="18" x2="34" y2="26" stroke="#555" strokeWidth=".4" />
        <line x1="34" y1="18" x2="26" y2="26" stroke="#555" strokeWidth=".4" />
        <circle cx="30" cy="22" r="1.2" fill="currentColor" />
      </g>
      <line x1="10" y1="22" x2="20" y2="14" stroke="currentColor" strokeWidth="1.8" />
      <line x1="10" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1.8" />
      <line x1="20" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="14" x2="30" y2="22" stroke="currentColor" strokeWidth="1.8" />
      <line x1="20" y1="14" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="17" y1="12.5" x2="20" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20,14 Q23,11 25,10 L26,11.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="9.5" x2="26.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="22" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="22" r=".6" fill="currentColor" />
    </g>
  );
}

function Runner() {
  return (
    <g className="spb-anim-bob">
      <circle cx="22" cy="5" r="3.5" fill="currentColor" />
      <ellipse cx="22" cy="5" rx="3.5" ry="3.5" fill="currentColor" />
      <path d="M19,3 Q22,1.5 25,3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
      <circle cx="24" cy="4.5" r=".6" fill="rgba(255,255,255,.5)" />
      <path d="M21,8 Q20,13 19,18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M20,10 L19.5,13" stroke="currentColor" strokeWidth="2.5" fill="none" opacity=".8" />
      <g className="spb-arm-back" style={{ transformOrigin: "20px 11px" }}>
        <path d="M20,11 L15,15 L13,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="spb-arm-front" style={{ transformOrigin: "20px 11px" }}>
        <path d="M20,11 L25,15 L27,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="spb-leg-back" style={{ transformOrigin: "19px 18px" }}>
        <path d="M19,18 L15,24 L14,28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14,28 L12,28.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="spb-leg-front" style={{ transformOrigin: "19px 18px" }}>
        <path d="M19,18 L23,24 L24,28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24,28 L26,28.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Caterpillar() {
  return (
    <g className="spb-anim-undulate">
      <circle cx="4" cy="21" r="3.5" fill="currentColor" opacity=".4" />
      <circle cx="4" cy="20.5" r="2.8" fill="currentColor" opacity=".5" />
      <circle cx="10.5" cy="19.5" r="4" fill="currentColor" opacity=".55" />
      <circle cx="10.5" cy="19" r="3.2" fill="currentColor" opacity=".65" />
      <circle cx="18" cy="18" r="4.5" fill="currentColor" opacity=".7" />
      <circle cx="18" cy="17.5" r="3.5" fill="currentColor" opacity=".8" />
      <circle cx="26.5" cy="16.5" r="5" fill="currentColor" opacity=".85" />
      <circle cx="26.5" cy="16" r="4" fill="currentColor" opacity=".9" />
      <circle cx="34" cy="15" r="5.5" fill="currentColor" />
      <circle cx="34" cy="14.5" r="4.5" fill="currentColor" opacity=".9" />
      <circle cx="6" cy="19.5" r=".8" fill="rgba(255,255,255,.15)" />
      <circle cx="12.5" cy="18" r="1" fill="rgba(255,255,255,.15)" />
      <circle cx="20" cy="16.5" r="1.2" fill="rgba(255,255,255,.12)" />
      <circle cx="28.5" cy="15" r="1.3" fill="rgba(255,255,255,.1)" />
      <circle cx="37" cy="13" r="1.3" fill="#fff" />
      <circle cx="37.3" cy="12.8" r=".6" fill="#333" />
      <circle cx="37.5" cy="12.5" r=".25" fill="#fff" />
      <circle cx="34.5" cy="13.5" r="1" fill="#fff" />
      <circle cx="34.7" cy="13.3" r=".5" fill="#333" />
      <circle cx="34.9" cy="13.1" r=".2" fill="#fff" />
      <path d="M33,17.5 Q35.5,19 38,17.5" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth=".7" strokeLinecap="round" />
      <circle cx="35" cy="10" r=".6" fill="currentColor" opacity=".6" />
      <circle cx="36.5" cy="10.5" r=".5" fill="currentColor" opacity=".5" />
      <path d="M36,10.5 Q38,5 39,4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="39.2" cy="3.5" r="1.5" fill="currentColor" />
      <circle cx="39.5" cy="3.3" r=".5" fill="rgba(255,255,255,.3)" />
      <path d="M34,10 Q35,6 36,5.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="36.2" cy="5" r="1.2" fill="currentColor" />
      <circle cx="36.4" cy="4.8" r=".4" fill="rgba(255,255,255,.3)" />
      <line x1="4" y1="24.5" x2="3.5" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="5.5" y1="24.5" x2="6" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="10" y1="23.5" x2="9.5" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="11.5" y1="23.5" x2="12" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="17.5" y1="22.5" x2="17" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="19" y1="22.5" x2="19.5" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="26" y1="21.5" x2="25.5" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
      <line x1="27.5" y1="21.5" x2="28" y2="27" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".6" />
    </g>
  );
}

function Train() {
  return (
    <g className="spb-anim-bounce">
      <rect x="8" y="10" width="22" height="13" rx="2.5" fill="currentColor" />
      <path d="M8,16 L30,16 L30,17 L8,17 Z" fill="rgba(255,255,255,.1)" />
      <path d="M8,13 L30,13 L30,13.6 L8,13.6 Z" fill="rgba(255,255,255,.08)" />
      <rect x="2" y="5" width="10" height="18" rx="2" fill="currentColor" opacity=".9" />
      <rect x="2" y="5" width="10" height="3" rx="2" fill="currentColor" />
      <rect x="4" y="8" width="6" height="5" rx="1.5" fill="rgba(135,206,250,.3)" />
      <rect x="4.5" y="8.5" width="5" height="4" rx="1" fill="rgba(135,206,250,.15)" />
      <line x1="7" y1="8" x2="7" y2="13" stroke="currentColor" strokeWidth=".5" opacity=".4" />
      <path d="M25,10 L25,4 Q25,2 27,2 L28,2 Q29,2 29,4 L29,10" fill="currentColor" opacity=".85" />
      <ellipse cx="27" cy="3" rx="3.5" ry="1.8" fill="currentColor" />
      <ellipse cx="27" cy="3" rx="2" ry=".8" fill="currentColor" opacity=".5" />
      <circle cx="27" cy="1" r="2.2" fill="rgba(200,200,200,.25)">
        <animate attributeName="cy" values="1;-3;1" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".25;0;.25" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="2.2;4.5;2.2" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="29" cy="0" r="1.5" fill="rgba(200,200,200,.15)">
        <animate attributeName="cy" values="0;-4;0" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".15;0;.15" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;3;1.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <path d="M30,22 L36,17 L36,22 Z" fill="currentColor" opacity=".7" />
      <path d="M30,22 L34,19 L34,22 Z" fill="currentColor" opacity=".5" />
      <circle cx="35" cy="15" r="2" fill="#fde68a" opacity=".9" />
      <circle cx="35" cy="15" r="1.2" fill="#fff" opacity=".4" />
      <rect x="1" y="16" width="2" height="2.5" rx=".8" fill="#ef4444" opacity=".7" />
      <rect x="2" y="22" width="34" height="3.5" rx="1.5" fill="currentColor" opacity=".65" />
      <rect x="2" y="22" width="34" height="1" rx=".5" fill="rgba(255,255,255,.08)" />
      <g>
        <circle cx="8" cy="27.5" r="3.8" fill="#1a1a2e" />
        <circle cx="8" cy="27.5" r="2.8" fill="#2a2a3e" />
        <circle cx="8" cy="27.5" r="1.5" fill="#555" />
        <circle cx="8" cy="27.5" r=".5" fill="#888" />
      </g>
      <g>
        <circle cx="18" cy="27.5" r="3.8" fill="#1a1a2e" />
        <circle cx="18" cy="27.5" r="2.8" fill="#2a2a3e" />
        <circle cx="18" cy="27.5" r="1.5" fill="#555" />
        <circle cx="18" cy="27.5" r=".5" fill="#888" />
      </g>
      <g>
        <circle cx="28" cy="27.5" r="3.8" fill="#1a1a2e" />
        <circle cx="28" cy="27.5" r="2.8" fill="#2a2a3e" />
        <circle cx="28" cy="27.5" r="1.5" fill="#555" />
        <circle cx="28" cy="27.5" r=".5" fill="#888" />
      </g>
      <line x1="8" y1="27.5" x2="18" y2="27.5" stroke="#555" strokeWidth=".8" opacity=".4" />
    </g>
  );
}

export const CHARACTER_MAP: Record<Character, () => JSX.Element> = {
  snail: Snail,
  car: Car,
  truck: Truck,
  rocket: Rocket,
  bicycle: Bicycle,
  runner: Runner,
  caterpillar: Caterpillar,
  train: Train,
};

export const TRAIL_CHARACTERS = new Set<Character>(["snail", "rocket", "train"]);
