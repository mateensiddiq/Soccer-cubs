// Decorative hero ground. Everything icon-like now comes from Phosphor.

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
