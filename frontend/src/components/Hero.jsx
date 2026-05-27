import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToCities = () => {
    const element = document.getElementById('cities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80)',
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
            Asesoría profesional en cada paso del camino.
          </p>

          <Button 
            onClick={scrollToCities}
            className="h-14 px-10 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-lg shadow-2xl"
          >
            <Search className="h-5 w-5 mr-2" />
            Explorar Propiedades
          </Button>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <span className="text-3xl font-bold text-white">1500+</span>
              <span className="text-white/90">Propiedades Vendidas</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <span className="text-3xl font-bold text-white">98%</span>
              <span className="text-white/90">Clientes Satisfechos</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <span className="text-3xl font-bold text-white">15+</span>
              <span className="text-white/90">Años de Experiencia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
