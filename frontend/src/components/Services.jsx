import React from 'react';
import { mockServices } from '../data/mock';
import { Home, Key, Calculator, TrendingUp, Scale, PiggyBank } from 'lucide-react';

const iconMap = {
  home: Home,
  key: Key,
  calculator: Calculator,
  trendingUp: TrendingUp,
  scale: Scale,
  piggyBank: PiggyBank,
};

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Servicios</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Soluciones Integrales para Ti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios inmobiliarios diseñados para satisfacer
            todas tus necesidades en el mercado de bienes raíces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockServices.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-300"
              >
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-3xl p-12 border border-amber-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">¿Necesitas asesoría personalizada?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta
              para tus necesidades inmobiliarias. Agenda una consulta gratuita hoy mismo.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;