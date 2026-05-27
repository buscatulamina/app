import React from 'react';

const HouseLogo = ({ className = '', width = 250, height = 130 }) => {
  const strokeColor = '#fbbf24';
  const accentColor = '#fde68a';
  
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 250 130"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* House cluster - all outline */}
      <g transform="translate(50, 5)" stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        
        {/* Left house */}
        <path d="M 0 60 L 0 35 L 30 8 L 60 35 L 60 70 L 0 70 Z" />
        
        {/* Left house - chimney */}
        <path d="M 45 18 L 45 8 L 50 8 L 50 22" />
        
        {/* Left house window (arch) */}
        <path d="M 20 65 L 20 50 Q 20 38 30 38 Q 40 38 40 50 L 40 65" />
        <line x1="30" y1="38" x2="30" y2="65" />
        <line x1="20" y1="52" x2="40" y2="52" />

        {/* Center house (taller) */}
        <path d="M 45 60 L 45 30 L 80 0 L 115 30 L 115 70 L 45 70 Z" />
        
        {/* Center house door */}
        <path d="M 70 70 L 70 50 Q 70 45 75 45 L 85 45 Q 90 45 90 50 L 90 70" />
        <circle cx="86" cy="58" r="0.8" fill={strokeColor} />
        
        {/* Center house small window above door */}
        <path d="M 73 42 Q 73 32 80 32 Q 87 32 87 42" />
        <line x1="80" y1="32" x2="80" y2="42" />
        <line x1="73" y1="37" x2="87" y2="37" />

        {/* Right house */}
        <path d="M 100 60 L 100 33 L 130 8 L 160 35 L 160 70 L 100 70 Z" />
        
        {/* Right house window (arch) */}
        <path d="M 120 65 L 120 50 Q 120 38 130 38 Q 140 38 140 50 L 140 65" />
        <line x1="130" y1="38" x2="130" y2="65" />
        <line x1="120" y1="52" x2="140" y2="52" />

        {/* Roof line details - left */}
        <line x1="-3" y1="37" x2="30" y2="6" strokeWidth="1.5" />
        <line x1="30" y1="6" x2="62" y2="37" strokeWidth="1.5" />
        
        {/* Roof line details - center */}
        <line x1="42" y1="32" x2="80" y2="-2" strokeWidth="1.8" />
        <line x1="80" y1="-2" x2="117" y2="32" strokeWidth="1.8" />
        
        {/* Roof line details - right */}
        <line x1="97" y1="35" x2="130" y2="6" strokeWidth="1.5" />
        <line x1="130" y1="6" x2="162" y2="37" strokeWidth="1.5" />

        {/* Decorative wave below - drawn with lines */}
        <path 
          d="M -15 85 Q 15 75 45 82 T 105 82 T 165 85"
          strokeWidth="1.5"
          stroke={strokeColor}
        />
        <path 
          d="M -10 92 Q 20 84 50 89 T 110 89 T 165 92"
          strokeWidth="1"
          stroke={accentColor}
          opacity="0.7"
        />
      </g>

      {/* Decorative ornaments around text */}
      <line x1="35" y1="120" x2="65" y2="120" stroke={strokeColor} strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="70" cy="120" r="1" fill={strokeColor} />
      <line x1="185" y1="120" x2="215" y2="120" stroke={strokeColor} strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="180" cy="120" r="1" fill={strokeColor} />

      {/* "ZEGERS PROPIEDADES" text */}
      <text
        x="125"
        y="124"
        textAnchor="middle"
        fill={strokeColor}
        fontSize="12"
        fontWeight="700"
        fontFamily="'Playfair Display', serif"
        style={{ letterSpacing: '0.22em' }}
      >
        ZEGERS PROPIEDADES
      </text>
    </svg>
  );
};

export default HouseLogo;
