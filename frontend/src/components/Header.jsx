import React, { useState, useEffect } from 'react';
import { Building2, Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    navigate('/login');
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
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Dancing Script', cursive", letterSpacing: '0.02em' }}
            >
              Zegers Propiedades
            </span>
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
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg uppercase text-xs tracking-wider font-semibold px-6 italic"
            >
              Contacto
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white" 
              title="Cerrar Sesión"
            >
              <LogOut className="h-4 w-4" />
            </Button>
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
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white w-full uppercase text-xs tracking-wider"
            >
              Contacto
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="bg-transparent border-white/30 text-white hover:bg-white/10 w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
