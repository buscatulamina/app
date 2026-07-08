import React from 'react';
import { MapPin } from 'lucide-react';

const cities = [
  {
    name: 'Viña del Mar',
    keyword: 'Viña del Mar',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800',
    description: 'Ciudad Jardín'
  },
  {
    name: 'Quilpué',
    keyword: 'Quilpué',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800',
    description: 'Ciudad del Sol'
  },
  {
    name: 'Villa Alemana',
    keyword: 'Villa Alemana',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    description: 'Ciudad de los Molinos'
  },
  {
    name: 'Olmué',
    keyword: 'Olmué',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    description: 'Naturaleza y Tranquilidad'
  },
  {
    name: 'Limache',
    keyword: 'Limache',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    description: 'Valle y Tradición'
  }
];

const CitySelector = ({ onCitySelect, activeCity }) => {
  const handleClick = (cityKeyword) => {
    onCitySelect(cityKeyword);
    setTimeout(() => {
      const element = document.getElementById('properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="cities" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Ubicaciones</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Explora por Ciudad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecciona la ubicación de tu interés y descubre las propiedades disponibles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city) => (
            <button
              key={city.keyword}
              onClick={() => handleClick(city.keyword)}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                activeCity === city.keyword ? 'ring-4 ring-amber-500' : ''
              }`}
            >
              {/* Background image */}
              <div
                className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${city.image})` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                  {city.name}
                </h3>
                <p className="text-white/90 text-sm drop-shadow-md">
                  {city.description}
                </p>
              </div>

              {/* Active indicator */}
              {activeCity === city.keyword && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Activa
                </div>
              )}
            </button>
          ))}
        </div>

        {activeCity && (
          <div className="text-center mt-8">
            <button
              onClick={() => onCitySelect(null)}
              className="text-amber-600 hover:text-amber-700 font-semibold underline"
            >
              Ver todas las propiedades
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CitySelector;
