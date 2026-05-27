import React from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Experiencia Comprobada',
      description: 'Más de 15 años liderando el mercado inmobiliario con resultados excepcionales.'
    },
    {
      icon: Users,
      title: 'Equipo Profesional',
      description: 'Corredores certificados y especializados en diferentes sectores del mercado.'
    },
    {
      icon: TrendingUp,
      title: 'Mejores Precios',
      description: 'Tasaciones precisas y estrategias de negociación que maximizan tu inversión.'
    },
    {
      icon: Shield,
      title: 'Confianza Total',
      description: 'Transparencia y seguridad en cada transacción. Tu tranquilidad es nuestra prioridad.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Sobre Nosotros</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Tu Socio de Confianza en Bienes Raíces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos una corredora de propiedades con amplia trayectoria en el mercado chileno,
            dedicados a hacer realidad tus proyectos inmobiliarios con excelencia y profesionalismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-amber-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h3>
          <p className="text-lg opacity-95 max-w-3xl mx-auto mb-8">
            No solo vendemos o arrendamos propiedades, creamos relaciones duraderas basadas en la confianza,
            el conocimiento del mercado y el compromiso con tus objetivos. Cada cliente es único y merece
            una atención personalizada que garantice el éxito de su inversión.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              Asesoría Personalizada
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              Procesos Transparentes
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              Resultados Garantizados
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;