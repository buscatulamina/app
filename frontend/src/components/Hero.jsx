import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-white"></div>
      
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Tu Hogar, Nuestra Misión
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Encuentra la Propiedad
            <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mt-2">
              de tus Sueños
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Más de 15 años de experiencia ayudando a familias y empresas a encontrar el lugar perfecto.
            Asesoría profesional en cada paso del camino.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Ubicación (ej: Las Condes, Providencia)"
                    className="pl-10 h-12 border-gray-200 focus:border-amber-500"
                  />
                </div>
              </div>
              
              <Select>
                <SelectTrigger className="h-12 border-gray-200 focus:border-amber-500">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="oficina">Oficina</SelectItem>
                  <SelectItem value="local">Local Comercial</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className="h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
                onClick={scrollToProperties}
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">1500+</span>
              <span className="text-gray-600">Propiedades Vendidas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">98%</span>
              <span className="text-gray-600">Clientes Satisfechos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">15+</span>
              <span className="text-gray-600">Años de Experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;