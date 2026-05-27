import React from 'react';

const HouseLogo = ({ className = '', width = 220, height = 110 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 220 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="houseFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="accentGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#fde68a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* House cluster silhouette */}
      <g transform="translate(40, 10)">
        {/* Tall house (left) - background */}
        <path
          d="M 5 30 L 25 12 L 45 30 L 45 55 L 5 55 Z"
          fill="url(#houseFill)"
        />
        
        {/* Roof accent line (left) */}
        <path
          d="M 2 32 L 25 9 L 48 32"
          stroke="url(#accentGold)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Medium house (middle) - in front */}
        <path
          d="M 35 25 L 60 5 L 85 25 L 85 55 L 35 55 Z"
          fill="url(#houseFill)"
        />
        
        {/* Roof accent line (middle) */}
        <path
          d="M 32 27 L 60 2 L 88 27"
          stroke="url(#accentGold)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Window middle house */}
        <rect x="50" y="33" width="20" height="14" fill="#1e293b" rx="1" />
        <line x1="60" y1="33" x2="60" y2="47" stroke="url(#accentGold)" strokeWidth="1" />
        <line x1="50" y1="40" x2="70" y2="40" stroke="url(#accentGold)" strokeWidth="1" />

        {/* Tall house (right) - background */}
        <path
          d="M 90 22 L 115 5 L 140 22 L 140 55 L 90 55 Z"
          fill="url(#houseFill)"
        />
        
        {/* Roof accent line (right) */}
        <path
          d="M 87 24 L 115 2 L 143 24"
          stroke="url(#accentGold)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Door on right house */}
        <rect x="108" y="38" width="14" height="17" fill="#1e293b" rx="1" />

        {/* Bushes left */}
        <ellipse cx="3" cy="55" rx="10" ry="6" fill="url(#houseFill)" />
        <ellipse cx="13" cy="55" rx="8" ry="5" fill="url(#houseFill)" />
        
        {/* Bushes right */}
        <ellipse cx="142" cy="55" rx="8" ry="5" fill="url(#houseFill)" />

        {/* Ground line with elegant double border */}
        <line x1="-10" y1="60" x2="155" y2="60" stroke="url(#houseFill)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-5" y1="64" x2="150" y2="64" stroke="url(#accentGold)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* "Zegers" text - elegant serif */}
      <text
        x="110"
        y="92"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="14"
        fontWeight="700"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.25em' }}
      >
        ZEGERS
      </text>

      {/* Decorative lines around "Propiedades" */}
      <line x1="50" y1="103" x2="78" y2="103" stroke="url(#accentGold)" strokeWidth="1" strokeLinecap="round" />
      <line x1="142" y1="103" x2="170" y2="103" stroke="url(#accentGold)" strokeWidth="1" strokeLinecap="round" />

      {/* "Propiedades" text */}
      <text
        x="110"
        y="106"
        textAnchor="middle"
        fill="#fef3c7"
        fontSize="8"
        fontWeight="500"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.4em' }}
      >
        PROPIEDADES
      </text>
    </svg>
  );
};

export default HouseLogo;
