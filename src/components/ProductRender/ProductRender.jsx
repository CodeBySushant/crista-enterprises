import { useId } from 'react';
import cn from '../../utils/cn';

/**
 * Studio-style technical product renders (SVG).
 * ------------------------------------------------------------
 * Used as catalogue imagery until real Crista product photography is
 * supplied. Each product kind has its own drawing; lighting renders scale
 * with wattage so every SKU reads differently.
 *
 * view: 'studio' (default) | 'technical' (grid + dimension lines) | 'detail' (close crop)
 */

const C = {
  body: '#2a2d31',
  body2: '#3a3e44',
  mid: '#5b6168',
  light: '#b9bec3',
  pale: '#dde0e2',
  steel: '#8b9197',
  pad: '#1f2124',
  glow: '#eafff1',
  led: '#ffffff',
};

const Shadow = ({ cx = 200, cy = 262, rx = 130 }) => <ellipse cx={cx} cy={cy} rx={rx} ry="7" fill="#17191c" opacity="0.08" />;

/* ---------------- Lighting ---------------- */
function StreetLight({ size = 100, gid }) {
  const L = 150 + Math.min(size, 200) * 0.75; // head length
  const x0 = 60;
  const leds = Math.max(3, Math.round(size / 18));
  return (
    <g>
      <Shadow rx={L / 1.6} cx={x0 + L / 2 + 10} />
      {/* spigot / pole stub */}
      <rect x="22" y="138" width="46" height="16" rx="3" fill={C.steel} />
      <rect x="18" y="135" width="8" height="22" rx="2" fill={C.mid} />
      {/* head top shell */}
      <path d={`M${x0} 128 L${x0 + L - 18} 116 Q${x0 + L} 116 ${x0 + L} 132 L${x0 + L - 6} 160 L${x0 + 6} 166 Q${x0} 166 ${x0} 158 Z`} fill={C.body} />
      <path d={`M${x0 + 4} 130 L${x0 + L - 20} 119 Q${x0 + L - 6} 119 ${x0 + L - 6} 128`} stroke={C.body2} strokeWidth="2" fill="none" />
      {/* cooling fins */}
      {Array.from({ length: Math.round(L / 14) }).map((_, i) => {
        const x = x0 + 22 + i * 13;
        if (x > x0 + L - 34) return null;
        const yTop = 128 - ((x - x0) / L) * 12;
        return <line key={i} x1={x} y1={yTop + 3} x2={x - 4} y2={yTop + 26} stroke={C.body2} strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* lens */}
      <path d={`M${x0 + 26} 162 L${x0 + L - 14} 156 L${x0 + L - 18} 172 L${x0 + 30} 178 Z`} fill={`url(#${gid}-lens)`} stroke={C.mid} strokeWidth="1.5" />
      {Array.from({ length: leds }).map((_, i) => {
        const t = (i + 0.5) / leds;
        const x = x0 + 32 + t * (L - 52);
        const y = 167 - t * 6;
        return <circle key={i} cx={x} cy={y} r="3.2" fill={C.led} opacity="0.95" />;
      })}
      <text x={x0 + L / 2} y="150" textAnchor="middle" fontSize="9" fontFamily="Inter" fill="#ffffff" opacity="0.35" letterSpacing="2">CRISTA</text>
    </g>
  );
}

function FloodLight({ size = 200, gid }) {
  const w = 110 + Math.min(size, 400) * 0.22;
  const h = w * 0.82;
  const x = 200 - w / 2;
  const y = 140 - h / 2;
  const cols = size >= 300 ? 6 : size >= 200 ? 5 : 4;
  const rows = size >= 300 ? 5 : 4;
  return (
    <g>
      <Shadow rx={w / 1.3} />
      {/* U-bracket */}
      <path d={`M${x - 16} ${y + h / 2} L${x - 16} ${y + h + 34} L${x + w + 16} ${y + h + 34} L${x + w + 16} ${y + h / 2}`} fill="none" stroke={C.mid} strokeWidth="8" strokeLinejoin="round" />
      <rect x={200 - 26} y={y + h + 30} width="52" height="10" rx="2" fill={C.body2} />
      <circle cx={x - 16} cy={y + h / 2} r="7" fill={C.body2} />
      <circle cx={x + w + 16} cy={y + h / 2} r="7" fill={C.body2} />
      {/* fins (depth) */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={x + 6 + (i * (w - 12)) / 8 - 2} y={y - 12} width="4" height="14" rx="1" fill={C.body2} />
      ))}
      {/* body */}
      <rect x={x} y={y} width={w} height={h} rx="6" fill={C.body} />
      <rect x={x + 9} y={y + 9} width={w - 18} height={h - 18} rx="3" fill={`url(#${gid}-lens)`} stroke={C.mid} strokeWidth="1.5" />
      {/* LED matrix */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <g key={`${r}-${c}`}>
            <circle cx={x + 9 + ((c + 0.5) * (w - 18)) / cols} cy={y + 9 + ((r + 0.5) * (h - 18)) / rows} r={Math.min(w / cols, h / rows) * 0.24} fill={C.led} />
            <circle cx={x + 9 + ((c + 0.5) * (w - 18)) / cols} cy={y + 9 + ((r + 0.5) * (h - 18)) / rows} r={Math.min(w / cols, h / rows) * 0.36} fill="none" stroke="#cfe9d8" strokeWidth="1" />
          </g>
        )),
      )}
    </g>
  );
}

function SolarLight({ gid }) {
  return (
    <g>
      <Shadow cx={200} rx={60} />
      {/* pole */}
      <rect x="194" y="70" width="12" height="192" fill={C.steel} />
      <rect x="180" y="250" width="40" height="12" rx="2" fill={C.mid} />
      {/* panel (tilted) */}
      <g transform="rotate(-18 200 62)">
        <rect x="120" y="44" width="160" height="40" rx="3" fill="#1d2a3a" />
        {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={120 + i * 20} y1="44" x2={120 + i * 20} y2="84" stroke="#3a5373" strokeWidth="1" />)}
        <line x1="120" y1="64" x2="280" y2="64" stroke="#3a5373" strokeWidth="1" />
        <rect x="120" y="44" width="160" height="40" rx="3" fill="none" stroke={C.light} strokeWidth="2" />
      </g>
      {/* arm + luminaire */}
      <path d="M206 120 L268 112" stroke={C.steel} strokeWidth="6" strokeLinecap="round" />
      <path d="M252 104 L330 98 Q338 98 336 106 L332 122 L254 126 Q248 126 248 120 Z" fill={C.body} />
      <path d="M262 122 L326 118 L324 128 L264 132 Z" fill={`url(#${gid}-lens)`} />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={272 + i * 12} cy={126 - i * 0.8} r="2.6" fill={C.led} />)}
      {/* battery box */}
      <rect x="184" y="150" width="32" height="44" rx="3" fill={C.body2} />
      <rect x="190" y="158" width="20" height="4" rx="1" fill="#2fc56a" />
    </g>
  );
}

function HighBay({ size = 150, gid }) {
  const r = 70 + Math.min(size, 200) * 0.2;
  return (
    <g>
      <Shadow rx={r * 1.1} />
      {/* hook */}
      <path d="M200 40 Q214 40 214 54 Q214 66 200 66" fill="none" stroke={C.steel} strokeWidth="5" strokeLinecap="round" />
      <rect x="192" y="64" width="16" height="22" rx="3" fill={C.mid} />
      {/* driver */}
      <rect x="176" y="84" width="48" height="26" rx="4" fill={C.body2} />
      {/* fin crown */}
      <ellipse cx="200" cy="138" rx={r} ry={r * 0.32} fill={C.body} />
      {Array.from({ length: 22 }).map((_, i) => {
        const a = (i / 22) * Math.PI;
        const x = 200 - Math.cos(a) * r * 0.95;
        return <line key={i} x1={x} y1={112 + Math.sin(a) * 6} x2={x} y2={158 - Math.sin(a) * 2} stroke={C.body2} strokeWidth="3" />;
      })}
      <path d={`M${200 - r} 138 L${200 - r} 156 Q200 ${190} ${200 + r} 156 L${200 + r} 138`} fill={C.body} />
      <rect x={200 - r * 0.5} y="106" width={r} height="12" rx="3" fill={C.body2} />
      {/* lens */}
      <ellipse cx="200" cy="164" rx={r * 0.86} ry={r * 0.2} fill={`url(#${gid}-lens)`} stroke={C.mid} strokeWidth="1.5" />
      {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={200 - r * 0.6 + (i * r * 1.2) / 8} cy={164 + Math.sin((i / 8) * Math.PI) * 4} r="2.6" fill={C.led} />)}
    </g>
  );
}

/* ---------------- Gym ---------------- */
function Treadmill() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={150} />
      <path d="M60 236 L330 222 L344 240 L70 256 Z" fill={C.body} />
      <path d="M78 236 L318 224 L326 232 L84 245 Z" fill={C.pad} />
      <rect x="300" y="210" width="50" height="34" rx="6" fill={C.body2} />
      <path d="M318 214 L292 92" stroke={C.mid} strokeWidth="10" />
      <path d="M338 210 L314 90" stroke={C.body2} strokeWidth="8" />
      <path d="M288 96 L232 104" stroke={C.light} strokeWidth="6" />
      <rect x="262" y="58" width="74" height="42" rx="5" fill={C.body} transform="rotate(-10 300 80)" />
      <rect x="272" y="65" width="54" height="26" rx="2" fill="#2fc56a" opacity="0.18" transform="rotate(-10 300 80)" />
    </g>
  );
}

function Bike() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={110} />
      <path d="M100 252 L300 252" stroke={C.body2} strokeWidth="10" />
      <circle cx="270" cy="200" r="38" fill={C.body} />
      <circle cx="270" cy="200" r="14" fill={C.mid} />
      <path d="M150 252 L190 150 L270 200" stroke={C.mid} strokeWidth="12" fill="none" />
      <path d="M190 150 L180 110" stroke={C.steel} strokeWidth="8" />
      <path d="M156 104 L206 104" stroke={C.pad} strokeWidth="12" />
      <path d="M270 200 L290 110" stroke={C.mid} strokeWidth="10" />
      <path d="M282 100 L318 92" stroke={C.light} strokeWidth="6" />
      <rect x="276" y="70" width="44" height="26" rx="4" fill={C.body} />
      <circle cx="226" cy="214" r="8" fill={C.body2} />
    </g>
  );
}

function Elliptical() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={150} />
      <path d="M60 250 L340 250" stroke={C.body2} strokeWidth="10" />
      <ellipse cx="88" cy="210" rx="40" ry="40" fill={C.body} />
      <path d="M90 214 L250 232" stroke={C.mid} strokeWidth="8" />
      <rect x="168" y="214" width="48" height="10" rx="2" fill={C.pad} transform="rotate(6 192 219)" />
      <path d="M300 250 L286 110" stroke={C.mid} strokeWidth="12" />
      <path d="M262 236 L250 70" stroke={C.light} strokeWidth="6" />
      <path d="M312 236 L320 70" stroke={C.light} strokeWidth="6" />
      <rect x="268" y="86" width="40" height="24" rx="4" fill={C.body} />
    </g>
  );
}

function Rower() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={160} />
      <circle cx="320" cy="200" r="44" fill={C.body} />
      <circle cx="320" cy="200" r="30" fill="none" stroke={C.body2} strokeWidth="4" />
      <path d="M316 244 L330 252" stroke={C.body2} strokeWidth="10" />
      <path d="M60 232 L300 214" stroke={C.light} strokeWidth="8" />
      <path d="M60 232 L52 252" stroke={C.body2} strokeWidth="8" />
      <rect x="138" y="210" width="44" height="12" rx="3" fill={C.pad} transform="rotate(-4 160 216)" />
      <rect x="250" y="196" width="26" height="22" rx="2" fill={C.body2} transform="rotate(-20 263 207)" />
      <path d="M300 170 L290 120" stroke={C.mid} strokeWidth="6" />
      <rect x="270" y="100" width="40" height="26" rx="4" fill={C.body} />
    </g>
  );
}

function Stack({ x = 260, y = 90, h = 150, w = 50 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={C.pale} />
      {Array.from({ length: Math.floor(h / 10) }).map((_, i) => (
        <rect key={i} x={x + 5} y={y + h - 10 - i * 10} width={w - 10} height="8" rx="1" fill={i < 5 ? C.body2 : C.mid} />
      ))}
    </g>
  );
}

function Press() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={150} />
      <path d="M70 252 L340 252" stroke={C.body2} strokeWidth="10" />
      <path d="M250 252 L250 70 L320 70 L320 252" stroke={C.mid} strokeWidth="10" fill="none" />
      <Stack x={260} y={110} h={130} />
      <path d="M140 252 L160 170" stroke={C.mid} strokeWidth="10" />
      <rect x="110" y="166" width="70" height="16" rx="5" fill={C.pad} />
      <rect x="168" y="80" width="18" height="90" rx="6" fill={C.pad} transform="rotate(8 177 125)" />
      <path d="M186 100 L250 86 M186 120 L100 116" stroke={C.light} strokeWidth="7" />
      <circle cx="96" cy="116" r="8" fill={C.body} />
    </g>
  );
}

function Lat() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={140} />
      <path d="M80 252 L330 252" stroke={C.body2} strokeWidth="10" />
      <path d="M270 252 L270 36 L130 36" stroke={C.mid} strokeWidth="10" fill="none" />
      <Stack x={280} y={120} h={120} />
      <circle cx="140" cy="46" r="8" fill={C.body} />
      <line x1="140" y1="54" x2="140" y2="96" stroke={C.light} strokeWidth="2" />
      <path d="M86 102 Q140 92 194 102" stroke={C.body} strokeWidth="7" fill="none" />
      <path d="M140 252 L140 196" stroke={C.mid} strokeWidth="10" />
      <rect x="106" y="186" width="68" height="14" rx="5" fill={C.pad} />
      <rect x="112" y="160" width="56" height="12" rx="5" fill={C.pad} />
    </g>
  );
}

function LegPress() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={160} />
      <path d="M50 252 L350 252" stroke={C.body2} strokeWidth="10" />
      <path d="M90 252 L300 72" stroke={C.mid} strokeWidth="12" />
      <path d="M300 72 L320 252" stroke={C.body2} strokeWidth="8" />
      <rect x="236" y="84" width="20" height="70" rx="3" fill={C.light} transform="rotate(-40 246 119)" />
      <rect x="196" y="124" width="38" height="58" rx="3" fill={C.body} transform="rotate(-40 215 153)" />
      <circle cx="196" cy="166" r="26" fill={C.body2} />
      <circle cx="196" cy="166" r="6" fill={C.light} />
      <rect x="60" y="208" width="64" height="16" rx="5" fill={C.pad} />
      <rect x="54" y="150" width="16" height="64" rx="5" fill={C.pad} transform="rotate(-20 62 182)" />
    </g>
  );
}

function Cable() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={170} />
      <path d="M40 252 L360 252" stroke={C.body2} strokeWidth="10" />
      <path d="M70 252 L70 50 L330 50 L330 252" stroke={C.mid} strokeWidth="10" fill="none" />
      <path d="M110 252 L110 50 M290 252 L290 50" stroke={C.mid} strokeWidth="6" />
      <Stack x={74} y={130} h={110} w={32} />
      <Stack x={294} y={130} h={110} w={32} />
      <path d="M150 64 L250 64" stroke={C.light} strokeWidth="6" />
      <circle cx="116" cy="150" r="7" fill={C.body} />
      <circle cx="284" cy="150" r="7" fill={C.body} />
      <path d="M116 150 L160 180 M284 150 L240 180" stroke={C.light} strokeWidth="2" />
    </g>
  );
}

function Plate({ cx, cy, r = 34 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.body} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke={C.body2} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill={C.light} />
    </g>
  );
}

function Rack() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={150} />
      {/* back uprights */}
      <path d="M120 236 L120 40 M300 236 L300 40" stroke={C.light} strokeWidth="9" />
      <path d="M120 40 L300 40" stroke={C.light} strokeWidth="7" />
      {/* front uprights */}
      <path d="M90 256 L90 52 M330 256 L330 52" stroke={C.mid} strokeWidth="12" />
      <path d="M90 52 L330 52 M90 52 L120 40 M330 52 L300 40" stroke={C.mid} strokeWidth="9" />
      <path d="M90 256 L330 256" stroke={C.body2} strokeWidth="8" />
      {/* holes */}
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i}><circle cx="90" cy={72 + i * 11} r="1.6" fill={C.pale} /><circle cx="330" cy={72 + i * 11} r="1.6" fill={C.pale} /></g>
      ))}
      {/* safety arms */}
      <path d="M90 190 L140 180 M330 190 L280 180" stroke={C.body} strokeWidth="7" />
      {/* barbell */}
      <path d="M36 120 L364 120" stroke={C.steel} strokeWidth="5" />
      <Plate cx={58} cy={120} r={36} />
      <Plate cx={342} cy={120} r={36} />
    </g>
  );
}

function Bench() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <Shadow rx={140} />
      <path d="M80 250 L320 250" stroke={C.body2} strokeWidth="10" />
      <path d="M110 250 L130 200 M290 250 L250 196" stroke={C.mid} strokeWidth="10" />
      <rect x="96" y="186" width="96" height="20" rx="6" fill={C.pad} />
      <rect x="196" y="120" width="120" height="20" rx="6" fill={C.pad} transform="rotate(-28 256 130)" />
      <path d="M240 200 L270 160" stroke={C.light} strokeWidth="6" />
      <circle cx="80" cy="250" r="9" fill={C.body} />
    </g>
  );
}

function Hex({ cx, cy, r }) {
  const pts = Array.from({ length: 6 }).map((_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  });
  return <polygon points={pts.join(' ')} fill={C.body} />;
}

function Dumbbell() {
  const db = (y, s) => (
    <g key={y}>
      <rect x={200 - 60 * s} y={y - 5} width={120 * s} height="10" rx="3" fill={C.steel} />
      <Hex cx={200 - 72 * s} cy={y} r={30 * s} />
      <Hex cx={200 + 72 * s} cy={y} r={30 * s} />
    </g>
  );
  return (
    <g>
      <Shadow rx={140} />
      {db(110, 0.8)}
      {db(170, 1)}
      {db(232, 1.15)}
    </g>
  );
}

function Kettlebell() {
  const kb = (cx, s) => (
    <g key={cx}>
      <path d={`M${cx - 26 * s} ${250 - 70 * s} Q${cx - 30 * s} ${250 - 120 * s} ${cx} ${250 - 120 * s} Q${cx + 30 * s} ${250 - 120 * s} ${cx + 26 * s} ${250 - 70 * s}`} fill="none" stroke={C.body2} strokeWidth={12 * s} />
      <circle cx={cx} cy={250 - 40 * s} r={46 * s} fill={C.body} />
      <rect x={cx - 30 * s} y={250 - 8 * s} width={60 * s} height={8 * s} fill={C.body} />
    </g>
  );
  return (
    <g>
      <Shadow rx={150} />
      {kb(110, 0.75)}
      {kb(290, 0.9)}
      {kb(200, 1.1)}
    </g>
  );
}

function Flooring() {
  const tiles = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const x = 200 + (c - r) * 58;
      const y = 120 + (c + r) * 30;
      tiles.push(
        <g key={`${r}${c}`}>
          <path d={`M${x} ${y} L${x + 58} ${y + 30} L${x} ${y + 60} L${x - 58} ${y + 30} Z`} fill={C.body} stroke={C.body2} strokeWidth="2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={x + ((i * 17) % 50) - 25} cy={y + 30 + ((i * 11) % 24) - 12} r="1.6" fill={i % 2 ? '#2fc56a' : C.light} opacity="0.7" />
          ))}
        </g>,
      );
    }
  }
  return (
    <g>
      {tiles}
      <path d="M26 210 L26 222 L200 312 L374 222 L374 210" fill="none" />
    </g>
  );
}

const RENDERERS = {
  street: StreetLight,
  flood: FloodLight,
  solar: SolarLight,
  highbay: HighBay,
  treadmill: Treadmill,
  bike: Bike,
  elliptical: Elliptical,
  rower: Rower,
  press: Press,
  lat: Lat,
  legpress: LegPress,
  cable: Cable,
  rack: Rack,
  bench: Bench,
  dumbbell: Dumbbell,
  kettlebell: Kettlebell,
  flooring: Flooring,
};

const DETAIL_BOX = {
  street: '40 90 220 130', flood: '110 70 180 135', solar: '220 70 140 105', highbay: '110 80 180 135',
  treadmill: '220 40 150 112', bike: '180 50 170 128', elliptical: '30 150 160 120', rower: '250 140 130 98',
  press: '220 60 140 105', lat: '240 90 120 90', legpress: '140 80 160 120', cable: '50 100 140 105',
  rack: '20 60 140 105', bench: '170 80 160 120', dumbbell: '100 180 200 100', kettlebell: '120 110 160 120', flooring: '120 120 160 120',
};

export default function ProductRender({ kind, size, view = 'studio', label, className, tone = 'light' }) {
  const gid = useId().replace(/:/g, '');
  const Comp = RENDERERS[kind] ?? FloodLight;
  const viewBox = view === 'detail' ? DETAIL_BOX[kind] ?? '0 0 400 300' : '0 0 400 300';
  return (
    <div className={cn('relative h-full w-full', tone === 'dark' ? 'bg-[#e9ebec]' : tone === 'none' ? 'bg-transparent' : 'bg-mist', view === 'technical' && 'tech-grid', className)}>
      <svg viewBox={viewBox} className="absolute inset-0 h-full w-full" role="img" aria-label={label ? `${label} — product render` : 'Product render'} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${gid}-lens`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4fff8" />
            <stop offset="1" stopColor="#cfeedd" />
          </linearGradient>
        </defs>
        <g transform={view === 'studio' ? 'translate(0 0)' : undefined}>
          <Comp size={size} gid={gid} />
        </g>
        {view === 'technical' && (
          <g fontFamily="Inter" fontSize="9" fill="#5b6168" stroke="#5b6168" strokeWidth="0.8">
            <line x1="40" y1="282" x2="360" y2="282" />
            <line x1="40" y1="277" x2="40" y2="287" />
            <line x1="360" y1="277" x2="360" y2="287" />
            <line x1="378" y1="30" x2="378" y2="262" />
            <line x1="373" y1="30" x2="383" y2="30" />
            <line x1="373" y1="262" x2="383" y2="262" />
            <text x="200" y="296" textAnchor="middle" stroke="none" letterSpacing="1">L — SEE SPECIFICATIONS</text>
            <text x="388" y="150" textAnchor="middle" stroke="none" transform="rotate(90 388 150)" letterSpacing="1">H</text>
          </g>
        )}
      </svg>
    </div>
  );
}
