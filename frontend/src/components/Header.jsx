import React, { useState, useEffect } from 'react';
import { Menu, X, Plus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import HouseLogo from './HouseLogo';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/70 backdrop-blur-xl shadow-2xl py-3' 
          : 'bg-black/30 backdrop-blur-md py-5'
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <HouseLogo 
              className="group-hover:scale-105 transition-transform drop-shadow-2xl" 
              width={220} 
              height={115} 
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wider italic"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('properties')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wider italic"
            >
              Propiedades
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wider italic"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wider italic"
            >
              Testimonios
            </button>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg uppercase text-xs tracking-wider font-semibold px-5 italic"
            >
              <Link to="/add-property">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Agregar
              </Link>
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg uppercase text-xs tracking-wider font-semibold px-6 italic"
            >
              Contacto
            </Button>
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white/70 hover:text-red-400 hover:bg-white/10 border border-white/20 uppercase text-xs tracking-wider font-semibold px-4 italic"
                title="Cerrar sesión"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" />
                Salir
              </Button>
            )}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 bg-black/80 backdrop-blur-xl rounded-xl p-4">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-left uppercase text-sm tracking-wider"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('properties')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-left uppercase text-sm tracking-wider"
            >
              Propiedades
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-left uppercase text-sm tracking-wider"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-white/90 hover:text-amber-400 transition-colors font-medium text-left uppercase text-sm tracking-wider"
            >
              Testimonios
            </button>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white w-full uppercase text-xs tracking-wider"
            >
              <Link to="/add-property">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Agregar propiedad
              </Link>
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white w-full uppercase text-xs tracking-wider"
            >
              Contacto
            </Button>
            {isAuthenticated && (
  <Link to="/admin" className="text-white/80 hover:text-amber-400 transition-colors text-sm font-medium">
    Panel Admin
  </Link>
)}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white/70 hover:text-red-400 hover:bg-white/10 border border-white/20 w-full uppercase text-xs tracking-wider"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" />
                Cerrar sesión
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
