import React from 'react';
import { Building2, Facebook, Instagram, Linkedin, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ZEGERS PROPIEDADES</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tu socio de confianza en bienes raíces. Más de 15 años ayudando a familias
              y empresas a encontrar su lugar ideal.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 p-2 rounded-lg transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 p-2 rounded-lg transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 p-2 rounded-lg transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 p-2 rounded-lg transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('properties')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Propiedades
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Testimonios
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Servicios</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Compra y Venta</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Arriendo</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Tasaciones</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Inversiones</li>
              <li className="hover:text-amber-500 transition-colors cursor-pointer">Asesoría Legal</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span>+56992325032</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span>jacqueline.zegers@hotmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} ZEGERS PROPIEDADES. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;