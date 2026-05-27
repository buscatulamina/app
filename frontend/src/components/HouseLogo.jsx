import React from 'react';

const HouseLogo = ({ className = '', width = 250, height = 130 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 250 130"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="houseFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="waveFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* House cluster */}
      <g transform="translate(50, 5)">
        {/* Left house */}
        <path
          d="M 0 60 L 0 35 L 30 8 L 60 35 L 60 70 L 0 70 Z"
          fill="url(#houseFill)"
        />
        {/* Left house window (arch) */}
        <path
          d="M 20 50 Q 20 38 30 38 Q 40 38 40 50 L 40 65 L 20 65 Z"
          fill="white"
        />
        <line x1="30" y1="38" x2="30" y2="65" stroke="url(#houseFill)" strokeWidth="1.5" />
        <line x1="20" y1="52" x2="40" y2="52" stroke="url(#houseFill)" strokeWidth="1.5" />

        {/* Center house (taller) */}
        <path
          d="M 45 60 L 45 30 L 80 0 L 115 30 L 115 70 L 45 70 Z"
          fill="url(#houseFill)"
        />
        {/* Center house window (arch) */}
        <path
          d="M 68 42 Q 68 28 80 28 Q 92 28 92 42 L 92 62 L 68 62 Z"
          fill="white"
        />
        <line x1="80" y1="28" x2="80" y2="62" stroke="url(#houseFill)" strokeWidth="1.5" />
        <line x1="68" y1="45" x2="92" y2="45" stroke="url(#houseFill)" strokeWidth="1.5" />

        {/* Right house */}
        <path
          d="M 100 60 L 100 33 L 130 8 L 160 35 L 160 70 L 100 70 Z"
          fill="url(#houseFill)"
        />
        {/* Right house window (arch) */}
        <path
          d="M 120 50 Q 120 38 130 38 Q 140 38 140 50 L 140 65 L 120 65 Z"
          fill="white"
        />
        <line x1="130" y1="38" x2="130" y2="65" stroke="url(#houseFill)" strokeWidth="1.5" />
        <line x1="120" y1="52" x2="140" y2="52" stroke="url(#houseFill)" strokeWidth="1.5" />

        {/* Decorative wave below */}
        <path
          d="M -10 88 Q 20 75 50 85 Q 80 95 110 82 Q 140 70 165 88 L 165 105 Q 140 92 110 100 Q 80 110 50 100 Q 20 92 -10 105 Z"
          fill="url(#waveFill)"
        />
      </g>

      {/* "ZEGERS PROPIEDADES" text */}
      <text
        x="125"
        y="125"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="13"
        fontWeight="700"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.18em' }}
      >
        ZEGERS PROPIEDADES
      </text>
    </svg>
  );
};

export default HouseLogo;
