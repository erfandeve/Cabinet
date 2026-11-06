import type { IconKind } from "@/lib/data";

/** Stylised product renders (pure SVG, so they are crisp, light and indexable alt text lives on the wrapper). */
export default function ProductArt({ kind, hue = "#c39b5f", className = "" }: { kind: IconKind; hue?: string; className?: string }) {
  const id = `g-${kind}`;
  const metal = (
    <defs>
      <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f4f4f2" />
        <stop offset=".45" stopColor="#b9bcc0" />
        <stop offset=".55" stopColor="#8d9196" />
        <stop offset="1" stopColor="#e9eaec" />
      </linearGradient>
      <linearGradient id={`${id}-h`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={hue} stopOpacity=".95" />
        <stop offset="1" stopColor={hue} stopOpacity=".55" />
      </linearGradient>
      <radialGradient id={`${id}-s`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#000" stopOpacity=".28" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
  const M = `url(#${id}-m)`;
  const H = `url(#${id}-h)`;
  const shadow = <ellipse cx="100" cy="168" rx="70" ry="10" fill={`url(#${id}-s)`} />;

  const shapes: Record<IconKind, React.ReactNode> = {
    hinge: (
      <g>
        {shadow}
        <path d="M40 110 L100 80 L160 110 L100 140 Z" fill={M} stroke="#7a7f85" />
        <circle cx="72" cy="110" r="20" fill="#6f7479" />
        <circle cx="72" cy="110" r="15" fill={M} />
        <rect x="88" y="98" width="62" height="16" rx="8" transform="rotate(-27 88 98)" fill={M} stroke="#7a7f85" />
        <circle cx="132" cy="112" r="5" fill="#5d6267" />
        <circle cx="114" cy="122" r="5" fill="#5d6267" />
        <path d="M60 60 q40 -30 80 0" fill="none" stroke={hue} strokeWidth="3" strokeDasharray="4 6" />
      </g>
    ),
    slide: (
      <g>
        {shadow}
        <path d="M20 120 L150 60 L180 72 L50 132 Z" fill={M} stroke="#7a7f85" />
        <path d="M30 108 L160 48 L180 56 L50 116 Z" fill={M} stroke="#7a7f85" opacity=".9" />
        <path d="M50 132 L50 116 L180 56 L180 72 Z" fill="#8a8f94" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={60 + i * 22} cy={110 - i * 10} r="3.2" fill="#5d6267" />
        ))}
      </g>
    ),
    handle: (
      <g>
        {shadow}
        <rect x="30" y="92" width="140" height="16" rx="8" fill={hue} />
        <rect x="30" y="92" width="140" height="6" rx="3" fill="#fff" opacity=".18" />
        <rect x="46" y="106" width="10" height="22" rx="3" fill={hue} opacity=".85" />
        <rect x="144" y="106" width="10" height="22" rx="3" fill={hue} opacity=".85" />
      </g>
    ),
    lift: (
      <g>
        {shadow}
        <rect x="40" y="58" width="22" height="100" rx="4" fill="#d9d4cc" stroke="#a49c90" />
        <rect x="52" y="62" width="110" height="10" rx="5" transform="rotate(32 52 62)" fill={M} stroke="#7a7f85" />
        <rect x="56" y="70" width="74" height="16" rx="8" transform="rotate(32 56 70)" fill="#2b2b2b" />
        <circle cx="54" cy="66" r="6" fill="#5d6267" />
        <circle cx="146" cy="124" r="6" fill="#5d6267" />
      </g>
    ),
    basket: (
      <g>
        {shadow}
        <path d="M40 80 L160 80 L150 150 L50 150 Z" fill="none" stroke="#9ea3a8" strokeWidth="4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={52 + i * 19} y1="82" x2={58 + i * 17} y2="148" stroke="#b5b9bd" strokeWidth="2.5" />
        ))}
        <line x1="44" y1="105" x2="156" y2="105" stroke="#b5b9bd" strokeWidth="2.5" />
        <line x1="47" y1="128" x2="153" y2="128" stroke="#b5b9bd" strokeWidth="2.5" />
        <rect x="38" y="74" width="124" height="8" rx="4" fill={M} />
      </g>
    ),
    worktop: (
      <g>
        {shadow}
        <path d="M20 100 L120 60 L185 85 L85 125 Z" fill={hue} stroke="#c5bdb0" />
        <path d="M20 100 L85 125 L85 138 L20 113 Z" fill="#cfc6b8" />
        <path d="M85 125 L185 85 L185 98 L85 138 Z" fill="#bdb3a4" />
        <path d="M40 98 q30 -6 60 4 t60 -10" fill="none" stroke="#b49a6b" strokeWidth="1.4" opacity=".7" />
        <path d="M60 108 q30 -10 70 0" fill="none" stroke="#9e9688" strokeWidth="1" opacity=".5" />
      </g>
    ),
    panel: (
      <g>
        {shadow}
        <path d="M50 40 L130 25 L130 150 L50 165 Z" fill={H} />
        <path d="M130 25 L142 30 L142 155 L130 150 Z" fill={hue} opacity=".5" />
        <path d="M70 52 L118 43 L118 70 L70 79 Z" fill="#fff" opacity=".14" />
        <path d="M80 34 L150 22 L150 140 L80 152 Z" fill="none" stroke={hue} strokeOpacity=".35" />
      </g>
    ),
    light: (
      <g>
        {shadow}
        <defs>
          <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M30 70 L170 70 L190 160 L10 160 Z" fill={`url(#${id}-beam)`} />
        <rect x="26" y="60" width="148" height="12" rx="3" fill={M} stroke="#7a7f85" />
        <rect x="32" y="68" width="136" height="4" rx="2" fill="#fff4cf" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 200 190" className={className} role="img" aria-hidden="true">
      {metal}
      {shapes[kind]}
    </svg>
  );
}
