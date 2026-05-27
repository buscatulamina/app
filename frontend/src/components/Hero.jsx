import React from 'react';
import { MapPin } from 'lucide-react';

const cities = [
  {
    name: 'Viña del Mar',
    keyword: 'Viña del Mar',
    description: 'Ciudad Jardín'
  },
  {
    name: 'Quilpué',
    keyword: 'Quilpué',
    description: 'Ciudad del Sol'
  },
  {
    name: 'Villa Alemana',
    keyword: 'Villa Alemana',
    description: 'Ciudad de los Molinos'
  },
  {
    name: 'Olmué',
    keyword: 'Olmué',
    description: 'Naturaleza y Tranquilidad'
  }
];

const Hero = ({ onCitySelect, activeCity }) => {
  const handleCityClick = (cityKeyword) => {
    onCitySelect(cityKeyword);
    setTimeout(() => {
      const element = document.getElementById('properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80)',
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Tu Hogar, Nuestra Misión
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Encuentra la Propiedad
            <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mt-2">
              de tus Sueños
            </span>
          </h1>
          
          <p className="text-xl text-white/95 mb-12 max-w-2xl mx-auto drop-shadow-lg">
            Más de 15 años de experiencia ayudando a familias y empresas a encontrar el lugar perfecto.
          </p>

          {/* City Selector */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Explora por Ciudad
            </h2>
            <p className="text-white/90 mb-8 drop-shadow-md">
              Selecciona la ubicación de tu interés
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {cities.map((city) => (
                <button
                  key={city.keyword}
                  onClick={() => handleCityClick(city.keyword)}
                  className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    activeCity === city.keyword ? 'ring-2 ring-amber-400 bg-white/20' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white drop-shadow-md">
                        {city.name}
                      </h3>
                      <p className="text-white/80 text-xs mt-1">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  {activeCity === city.keyword && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Activa
                    </div>
                  )}
                </button>
              ))}
            </div>

            {activeCity && (
              <button
                onClick={() => onCitySelect(null)}
                className="mt-6 text-amber-300 hover:text-amber-200 font-semibold underline"
              >
                Ver todas las propiedades
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              <span className="text-2xl font-bold text-white">1500+</span>
              <span className="text-white/90 text-xs">Propiedades Vendidas</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              <span className="text-2xl font-bold text-white">98%</span>
              <span className="text-white/90 text-xs">Clientes Satisfechos</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              <span className="text-2xl font-bold text-white">15+</span>
              <span className="text-white/90 text-xs">Años de Experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
