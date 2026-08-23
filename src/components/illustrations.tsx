// Simple flat, hand-drawn-style decorative SVGs used as placeholder art
// throughout the site until real photos/video are available.

export function SoccerBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#fff8e9" stroke="#33200f" strokeWidth="4" />
      <g fill="#33200f">
        <polygon points="50,28 60,35 56,47 44,47 40,35" />
        <polygon points="50,28 60,35 68,28 62,18 38,18 32,28 40,35" fill="none" stroke="#33200f" strokeWidth="3" />
        <polygon points="18,45 28,42 32,53 24,62 14,58" fill="none" stroke="#33200f" strokeWidth="3" />
        <polygon points="82,45 72,42 68,53 76,62 86,58" fill="none" stroke="#33200f" strokeWidth="3" />
        <polygon points="38,80 46,70 54,70 62,80 50,88" fill="none" stroke="#33200f" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function SunBurst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="22" fill="#fad232" stroke="#33200f" strokeWidth="4" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 50 + Math.cos(angle) * 32;
        const y1 = 50 + Math.sin(angle) * 32;
        const x2 = 50 + Math.cos(angle) * 44;
        const y2 = 50 + Math.sin(angle) * 44;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fad232"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function GrassBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,60 L0,25 Q10,10 20,25 Q30,5 40,25 Q50,8 60,25 Q70,12 80,25 Q90,4 100,25 Q110,14 120,25 Q130,6 140,25 Q150,10 160,25 Q170,4 180,25 Q190,12 200,25 L200,60 Z"
        fill="#8fc694"
      />
    </svg>
  );
}

export function GrassField({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,140 L0,55 Q60,20 120,50 Q180,15 240,48 Q300,10 360,45 Q420,18 480,50 Q540,12 600,46 Q660,20 720,48 Q780,10 840,45 Q900,18 960,50 Q1020,14 1080,48 Q1140,20 1200,46 L1200,140 Z"
        fill="#6fae76"
      />
      <path
        d="M0,140 L0,80 Q50,55 100,78 Q150,50 200,76 Q250,48 300,75 Q350,52 400,78 Q450,50 500,76 Q550,54 600,78 Q650,50 700,76 Q750,52 800,78 Q850,48 900,75 Q950,54 1000,78 Q1050,50 1100,76 Q1150,55 1200,78 L1200,140 Z"
        fill="#8fc694"
      />
      <circle cx="140" cy="100" r="4" fill="#fff8e9" opacity="0.85" />
      <circle cx="340" cy="112" r="3.5" fill="#fad232" opacity="0.9" />
      <circle cx="560" cy="102" r="4" fill="#fff8e9" opacity="0.85" />
      <circle cx="780" cy="114" r="3.5" fill="#fad232" opacity="0.9" />
      <circle cx="980" cy="104" r="4" fill="#fff8e9" opacity="0.85" />
      <circle cx="1120" cy="112" r="3.5" fill="#fad232" opacity="0.9" />
    </svg>
  );
}

export function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <ellipse cx="50" cy="65" rx="24" ry="20" fill="currentColor" />
      <ellipse cx="22" cy="38" rx="11" ry="14" fill="currentColor" />
      <ellipse cx="48" cy="24" rx="11" ry="14" fill="currentColor" />
      <ellipse cx="74" cy="38" rx="11" ry="14" fill="currentColor" />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <path
        d="M25,45 a18,18 0 1,1 3,-30 a22,22 0 0,1 42,-3 a18,18 0 0,1 5,33 a15,15 0 0,1 -5,30 h-45 a15,15 0 0,1 0,-30 Z"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}

export function ShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 8 L84 20 V46 C84 68 70 84 50 92 C30 84 16 68 16 46 V20 Z"
        fill="currentColor"
      />
      <path
        d="M34 50 L45 61 L67 38"
        fill="none"
        stroke="#fff8e9"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WavyDivider({
  className = "",
  color = "#fff8e9",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 60"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,32 C150,60 350,0 600,28 C850,56 1050,4 1200,30 L1200,60 L0,60 Z"
        fill={color}
      />
    </svg>
  );
}
