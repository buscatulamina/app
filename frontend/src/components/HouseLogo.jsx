import React from 'react';

const HouseLogo = ({ className = '', width = 240, height = 110 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 240 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Houses outline only - no fill */}
      <g transform="translate(40, 5)" fill="none" stroke="url(#strokeGradient)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* Left house */}
        <path d="M 5 35 L 28 12 L 51 35 L 51 65 L 5 65 Z" />
        
        {/* Middle house (taller, in front) */}
        <path d="M 38 30 L 65 5 L 92 30 L 92 65 L 38 65 Z" />
        
        {/* Right house */}
        <path d="M 95 33 L 120 12 L 145 33 L 145 65 L 95 65 Z" />

        {/* Ground decorative double line */}
        <line x1="-15" y1="70" x2="165" y2="70" strokeWidth="2.5" />
        <line x1="-5" y1="75" x2="155" y2="75" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Text inside houses */}
      <text
        x="120"
        y="48"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="11"
        fontWeight="700"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.25em' }}
      >
        ZEGERS
      </text>
      
      <text
        x="120"
        y="62"
        textAnchor="middle"
        fill="#fde68a"
        fontSize="7"
        fontWeight="500"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.35em' }}
      >
        PROPIEDADES
      </text>
    </svg>
  );
};

export default HouseLogo;
