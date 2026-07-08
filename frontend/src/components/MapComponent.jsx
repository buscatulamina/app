import React, { useEffect, useRef } from 'react';

// Default center: Valparaíso / Viña del Mar region, Chile
const DEFAULT_LAT = -33.0472;
const DEFAULT_LNG = -71.6127;
const DEFAULT_ZOOM = 13;
const NO_COORDS_ZOOM = 10;

/**
 * MapComponent — read-only Leaflet map that shows a marker at the given
 * latitude/longitude. Falls back to the Valparaíso region when no
 * coordinates are provided.
 *
 * Props:
 *   latitude  {number|string|null}
 *   longitude {number|string|null}
 *   title     {string}  — used as the marker popup label
 */
const MapComponent = ({ latitude, longitude, title = 'Propiedad' }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const lat = latitude ? parseFloat(latitude) : null;
  const lng = longitude ? parseFloat(longitude) : null;
  const hasCoords = lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);

  useEffect(() => {
    // Leaflet is loaded via the CDN <link> in index.html and the npm package
    // provides the JS. We import it lazily here so SSR / test environments
    // that lack a DOM don't break.
    let L;
    try {
      L = require('leaflet');
    } catch {
      console.error('Leaflet is not available.');
      return;
    }

    if (!mapContainerRef.current) return;

    // Fix the default marker icon paths that get broken by webpack
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const centerLat = hasCoords ? lat : DEFAULT_LAT;
    const centerLng = hasCoords ? lng : DEFAULT_LNG;
    const zoom = hasCoords ? DEFAULT_ZOOM : NO_COORDS_ZOOM;

    // Initialise the map only once per mount
    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // OpenStreetMap tile layer (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    if (hasCoords) {
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`<strong>${title}</strong>`).openPopup();
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, title]);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {!hasCoords && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 text-xs text-amber-700 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Ubicación exacta no disponible — mostrando la región de Valparaíso
        </div>
      )}
      <div
        ref={mapContainerRef}
        style={{ height: '320px', width: '100%' }}
        aria-label={`Mapa de ubicación: ${title}`}
      />
    </div>
  );
};

export default MapComponent;
