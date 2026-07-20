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
