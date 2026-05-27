import React from 'react';

const HouseLogo = ({ className = '', width = 200, height = 100 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#fde68a', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Roof (triangle) with "Zegers" */}
      <polygon
        points="20,45 100,10 180,45"
        fill="url(#roofGradient)"
        stroke="#92400e"
        strokeWidth="1.5"
      />
      
      {/* Text "Zegers" on roof */}
      <text
        x="100"
        y="35"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="'Dancing Script', cursive"
        style={{ letterSpacing: '0.05em' }}
      >
        Zegers
      </text>

      {/* House body */}
      <rect
        x="30"
        y="45"
        width="140"
        height="50"
        fill="url(#houseGradient)"
        stroke="#92400e"
        strokeWidth="1.5"
      />

      {/* Window with "Propiedades" */}
      <rect
        x="45"
        y="55"
        width="110"
        height="30"
        fill="#1e293b"
        stroke="#92400e"
        strokeWidth="1.5"
        rx="2"
      />

      {/* Window cross lines */}
      <line x1="100" y1="55" x2="100" y2="85" stroke="#92400e" strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="70" x2="155" y2="70" stroke="#92400e" strokeWidth="1" opacity="0.5" />

      {/* Text "Propiedades" on window */}
      <text
        x="100"
        y="75"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="10"
        fontWeight="bold"
        fontFamily="'Inter', sans-serif"
        style={{ letterSpacing: '0.15em' }}
      >
        PROPIEDADES
      </text>

      {/* Chimney */}
      <rect
        x="135"
        y="15"
        width="12"
        height="20"
        fill="url(#roofGradient)"
        stroke="#92400e"
        strokeWidth="1.5"
      />

      {/* Small chimney top */}
      <rect
        x="133"
        y="13"
        width="16"
        height="3"
        fill="#92400e"
      />
    </svg>
  );
};

export default HouseLogo;
