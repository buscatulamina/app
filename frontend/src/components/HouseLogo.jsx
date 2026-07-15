import React from 'react';

const logoImage = `${process.env.PUBLIC_URL}/PHOTO-2026-06-18-18-21-35.jpg`;

/**
 * HouseLogo
 *
 * Renders the Zegers Propiedades brand logo image.
 * Keeps the same props interface (className, width, height) as the
 * previous SVG-based implementation for backward compatibility with
 * existing usages (e.g. Header.jsx).
 */
const HouseLogo = ({ className = '', width = 250, height = 130 }) => {
  return (
    <img
      src={logoImage}
      alt="Zegers Propiedades logo"
      width={width}
      height={height}
      loading="eager"
      className={`w-auto h-auto max-w-full object-contain rounded-lg shadow-md ${className}`}
      style={{ maxHeight: height, maxWidth: width }}
    />
  );
};

export default HouseLogo;
