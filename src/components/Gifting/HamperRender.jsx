import { PALETTES } from '../../data/gifting';
import cn from '../../utils/cn';

/**
 * Studio-style SVG hamper renders, composed from a container + items and
 * coloured per collection. Placeholders until real hamper photography exists.
 */

/* ---------- Items (drawn with their base at y=0, growing upward) ---------- */
const Item = {
  jar: (p) => (
    <g>
      <rect x="-19" y="-54" width="38" height="54" rx="7" fill="#f3e6cf" stroke={p.ink} strokeOpacity=".15" />
      <rect x="-19" y="-38" width="38" height="18" fill={p.secondary} opacity=".9" />
      <rect x="-21" y="-64" width="42" height="12" rx="3" fill={p.primary} />
      {[-9, 0, 9].map((x) => <circle key={x} cx={x} cy="-8" r="3.5" fill="#c58b52" />)}
    </g>
  ),
  diya: (p) => (
    <g>
      <path d="M-22 -14 Q0 6 22 -14 Z" fill="#b5642f" />
      <path d="M-22 -14 L22 -14" stroke={p.accent} strokeWidth="2" />
      <path d="M0 -40 Q8 -26 0 -16 Q-8 -26 0 -40 Z" fill="#f6b23c" />
      <path d="M0 -32 Q4 -24 0 -18 Q-4 -24 0 -32 Z" fill="#fff3c4" />
    </g>
  ),
  sweetbox: (p) => (
    <g>
      <rect x="-30" y="-40" width="60" height="40" rx="3" fill={p.secondary} />
      <rect x="-30" y="-40" width="60" height="9" fill={p.primary} opacity=".85" />
      <rect x="-4" y="-40" width="8" height="40" fill={p.accent} />
    </g>
  ),
  candle: (p) => (
    <g>
      <rect x="-14" y="-46" width="28" height="46" rx="4" fill="#f4efe6" stroke={p.ink} strokeOpacity=".15" />
      <rect x="-14" y="-26" width="28" height="10" fill={p.primary} opacity=".8" />
      <line x1="0" y1="-46" x2="0" y2="-52" stroke={p.ink} strokeWidth="1.5" />
      <path d="M0 -66 Q6 -57 0 -51 Q-6 -57 0 -66 Z" fill="#f6b23c" />
    </g>
  ),
  bottle: (p) => (
    <g>
      <rect x="-13" y="-78" width="26" height="78" rx="8" fill={p.primary} />
      <rect x="-8" y="-90" width="16" height="14" rx="3" fill={p.ink} />
      <rect x="-13" y="-48" width="26" height="16" fill={p.accent} opacity=".85" />
    </g>
  ),
  notebook: (p) => (
    <g transform="rotate(-6)">
      <rect x="-25" y="-74" width="50" height="74" rx="3" fill={p.primary} />
      <rect x="13" y="-74" width="5" height="74" fill={p.secondary} />
      <rect x="-15" y="-56" width="22" height="3" fill={p.accent} opacity=".9" />
    </g>
  ),
  pen: (p) => (
    <g transform="rotate(8)">
      <rect x="-3.5" y="-82" width="7" height="82" rx="3.5" fill={p.ink} />
      <rect x="-3.5" y="-82" width="7" height="12" rx="3" fill={p.secondary} />
    </g>
  ),
  mug: (p) => (
    <g>
      <path d="M17 -32 q14 0 14 12 q0 12 -14 12" fill="none" stroke={p.primary} strokeWidth="6" />
      <rect x="-19" y="-44" width="38" height="44" rx="5" fill={p.primary} />
      <rect x="-11" y="-30" width="22" height="12" rx="2" fill={p.accent} opacity=".9" />
    </g>
  ),
  pouch: (p) => (
    <g>
      <path d="M-22 0 L-22 -46 Q0 -60 22 -46 L22 0 Z" fill={p.secondary} />
      <path d="M-22 -46 Q0 -60 22 -46" fill="none" stroke={p.primary} strokeWidth="4" />
      <circle cx="0" cy="-24" r="8" fill={p.accent} />
    </g>
  ),
  tin: (p) => (
    <g>
      <rect x="-18" y="-54" width="36" height="54" rx="4" fill={p.secondary} />
      <rect x="-20" y="-60" width="40" height="10" rx="3" fill={p.primary} />
      <rect x="-18" y="-36" width="36" height="14" fill={p.primary} opacity=".55" />
    </g>
  ),
  choco: (p) => (
    <g transform="rotate(-4)">
      <rect x="-12" y="-62" width="24" height="62" rx="2" fill={p.primary} />
      <rect x="-12" y="-62" width="24" height="16" fill={p.accent} />
      <rect x="-12" y="-14" width="24" height="5" fill={p.secondary} />
    </g>
  ),
  plant: (p) => (
    <g>
      <path d="M-14 -2 L-17 -26 L17 -26 L14 -2 Z" fill={p.secondary} />
      <path d="M0 -26 Q-22 -46 -14 -66 Q2 -50 0 -26" fill="#4f8a55" />
      <path d="M0 -26 Q20 -42 18 -62 Q0 -50 0 -26" fill="#6aa66f" />
      <path d="M0 -26 Q-2 -54 4 -76 Q10 -52 0 -26" fill="#3f7546" />
    </g>
  ),
};

const SLOTS = { 2: [170, 230], 3: [145, 200, 255], 4: [128, 178, 228, 278] };

/* ---------- Containers ---------- */
function Back({ type, p }) {
  if (type === 'box') return <rect x="96" y="128" width="200" height="34" rx="3" fill={p.primary} opacity=".55" transform="rotate(-8 196 145)" />;
  if (type === 'basket') return <path d="M118 196 Q200 70 282 196" fill="none" stroke="#b98a55" strokeWidth="9" strokeLinecap="round" />;
  return null;
}

function Front({ type, p, branded }) {
  if (type === 'tray') {
    return (
      <g>
        <ellipse cx="200" cy="244" rx="138" ry="20" fill={p.secondary} />
        <ellipse cx="200" cy="238" rx="128" ry="14" fill="none" stroke={p.accent} strokeWidth="2" opacity=".8" />
      </g>
    );
  }
  if (type === 'basket') {
    return (
      <g>
        <path d="M84 192 L316 192 L298 262 L102 262 Z" fill="#c99a63" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="90" x2="310" y1={204 + i * 12} y2={204 + i * 12} stroke="#a77942" strokeWidth="2" opacity=".7" />
        ))}
        <rect x="80" y="186" width="240" height="12" rx="6" fill="#b4834e" />
        {branded && <Tag p={p} y={214} />}
      </g>
    );
  }
  const top = type === 'kit' ? 204 : 188;
  return (
    <g>
      <rect x="80" y={top} width="240" height={264 - top} rx="3" fill={p.primary} />
      <rect x="80" y={top} width="240" height="6" fill={p.ink} opacity=".25" />
      {type === 'box' && <rect x="190" y={top} width="20" height={264 - top} fill={p.secondary} />}
      {branded && <Tag p={p} y={type === 'kit' ? 222 : 212} />}
    </g>
  );
}

function Tag({ p, y }) {
  return (
    <g>
      <rect x="118" y={y} width="62" height="26" rx="2" fill="#ffffff" opacity=".95" />
      <rect x="121" y={y + 3} width="56" height="20" rx="1" fill="none" stroke={p.ink} strokeOpacity=".35" strokeDasharray="3 2" />
      <text x="149" y={y + 16.5} textAnchor="middle" fontSize="7.5" fontFamily="Figtree Variable, sans-serif" fontWeight="600" letterSpacing="1" fill={p.ink} opacity=".7">YOUR LOGO</text>
    </g>
  );
}

export default function HamperRender({ hamper, className, branded = true }) {
  const p = PALETTES[hamper.collection] ?? PALETTES.client;
  const items = hamper.items.slice(0, 4);
  const xs = SLOTS[items.length] ?? SLOTS[4];
  const base = hamper.container === 'tray' ? 238 : hamper.container === 'kit' ? 214 : 198;

  return (
    <div className={cn('relative h-full w-full', className)} style={{ background: p.bg }}>
      <svg viewBox="58 88 284 200" className="absolute inset-0 h-full w-full" role="img" aria-label={`${hamper.name} — illustrative hamper render`} preserveAspectRatio="xMidYMid meet">
        <ellipse cx="200" cy="270" rx="150" ry="8" fill="#17191c" opacity=".08" />
        <Back type={hamper.container} p={p} />
        {items.map((it, i) => (
          <g key={`${it}-${i}`} transform={`translate(${xs[i]} ${base + (i % 2 ? 4 : 0)})`}>{(Item[it] ?? Item.jar)(p)}</g>
        ))}
        <Front type={hamper.container} p={p} branded={branded && hamper.container !== 'tray'} />
      </svg>
    </div>
  );
}
