import React, { useState, useEffect } from 'react';
import { Building2, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ZEGERS PROPIEDADES</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Nosotros
            </button>
            <button onClick={() => scrollToSection('properties')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Propiedades
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Servicios
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Testimonios
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              Contacto
            </Button>
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-left">
              Nosotros
            </button>
            <button onClick={() => scrollToSection('properties')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-left">
              Propiedades
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-left">
              Servicios
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-left">
              Testimonios
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white w-full">
              Contacto
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;