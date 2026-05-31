const HdHillsSvg = () => (
  <svg className="cob-hills cob-hills-hd" viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="cob-hd-hill-far" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c8ecc8" />
        <stop offset="50%" stopColor="#a4d8a8" />
        <stop offset="100%" stopColor="#82bc8e" />
      </linearGradient>
      <linearGradient id="cob-hd-hill-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a6de98" />
        <stop offset="100%" stopColor="#58a850" />
      </linearGradient>
      <linearGradient id="cob-hd-hill-near" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8ed070" />
        <stop offset="100%" stopColor="#449038" />
      </linearGradient>
      <radialGradient id="cob-hd-bush" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#78c068" />
        <stop offset="100%" stopColor="#346830" />
      </radialGradient>
    </defs>
    <path d="M0,54 C35,42 82,48 138,40 C196,32 248,44 306,36 C332,32 348,34 360,32 L360,68 L0,68 Z" fill="url(#cob-hd-hill-far)" opacity="0.7" />
    <path d="M0,56 C40,44 88,50 142,42 C198,34 252,46 308,38 C334,34 350,36 360,34 L360,68 L0,68 Z" fill="url(#cob-hd-hill-far)" opacity="0.88" />
    <path d="M0,58 C45,48 95,52 148,46 C205,40 258,50 312,44 C336,41 352,43 360,41 L360,68 L0,68 Z" fill="url(#cob-hd-hill-far)" />
    <path d="M0,62 C38,54 88,50 132,56 C178,62 228,48 278,54 C318,58 342,59 360,55 L360,68 L0,68 Z" fill="url(#cob-hd-hill-mid)" opacity="0.95" />
    <path d="M0,65 C52,60 98,58 152,62 C198,66 248,56 302,60 C328,62 348,63 360,61 L360,70 L0,70 Z" fill="url(#cob-hd-hill-near)" />
    <path d="M0,66 C56,63 102,61 152,64 C206,67 246,59 300,62 C330,64 348,65 360,63" fill="none" stroke="#3a7a32" strokeWidth="0.55" opacity="0.42" />
    <path d="M0,63 C80,58 160,55 240,59 C300,62 330,63 360,61" fill="none" stroke="#2a6028" strokeWidth="0.35" opacity="0.28" />
    <path d="M0,60 C120,54 200,50 280,56 C320,58 340,59 360,57" fill="none" stroke="#1a5020" strokeWidth="0.25" opacity="0.18" />
    <ellipse cx="42" cy="56" rx="7" ry="4" fill="url(#cob-hd-bush)" opacity="0.58" />
    <ellipse cx="36" cy="54" rx="4" ry="2.8" fill="#589848" opacity="0.48" />
    <ellipse cx="290" cy="54" rx="8" ry="4.5" fill="url(#cob-hd-bush)" opacity="0.52" />
    <ellipse cx="283" cy="52" rx="4.5" ry="3" fill="#488038" opacity="0.42" />
    <ellipse cx="220" cy="58" rx="5.5" ry="3.2" fill="url(#cob-hd-bush)" opacity="0.44" />
    <ellipse cx="168" cy="59" rx="4.5" ry="2.8" fill="#428038" opacity="0.38" />
    <ellipse cx="125" cy="60" rx="3.5" ry="2" fill="#3a7030" opacity="0.32" />
    <rect x="88" y="56" width="1" height="6" rx="0.5" fill="#4a6838" opacity="0.38" />
    <rect x="96" y="55" width="1" height="7" rx="0.5" fill="#4a6838" opacity="0.32" />
    <rect x="104" y="56" width="1" height="6" rx="0.5" fill="#4a6838" opacity="0.35" />
    <line x1="88" y1="56" x2="105" y2="56" stroke="#5a7848" strokeWidth="0.45" opacity="0.28" />
    <line x1="200" y1="52" x2="260" y2="50" stroke="#3a5830" strokeWidth="0.3" opacity="0.2" />
    <line x1="202" y1="50" x2="258" y2="48" stroke="#3a5830" strokeWidth="0.25" opacity="0.15" />
    <path d="M198,52 Q230,48 262,50" fill="none" stroke="#2a4828" strokeWidth="0.2" opacity="0.2" />
  </svg>
);

export default HdHillsSvg;
