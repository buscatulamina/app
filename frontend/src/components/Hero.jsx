import React, { useState, useEffect } from 'react';
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
  },
  {
    name: 'Limache',
    keyword: 'Limache',
    description: 'Valle y Tradición'
  }
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80'
];

const Hero = ({ onCitySelect, activeCity }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Background images with fade transition */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: currentImage === index ? 1 : 0,
          }}
        ></div>
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Tu Hogar, Nuestra Misión
            </span>
          </div>

          {/* City Selector */}
          <div className="mb-12">
            <p className="text-white/90 mb-8 drop-shadow-md text-lg">
              Haz clic en la ubicación
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
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

          {/* Image indicators */}
          <div className="mt-12 flex justify-center gap-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentImage === index ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
