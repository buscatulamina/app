import React, { useState, useEffect } from 'react';
import { Building2, Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-xl shadow-2xl py-3' 
            : 'bg-black/30 backdrop-blur-md py-5'
        }`}
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

            {/* Menu button - opens side menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors group"
              data-testid="open-menu-btn"
            >
              <span className="hidden md:inline text-sm uppercase tracking-widest font-medium">Menú</span>
              <Menu className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 via-black to-gray-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Close button */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span 
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Zegers
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-amber-400 transition-colors"
              data-testid="close-menu-btn"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col gap-2 flex-1">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-4 px-4 text-white/90 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium uppercase tracking-wider border-l-2 border-transparent hover:border-amber-500"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('properties')}
              className="text-left py-4 px-4 text-white/90 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium uppercase tracking-wider border-l-2 border-transparent hover:border-amber-500"
            >
              Propiedades
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-4 px-4 text-white/90 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium uppercase tracking-wider border-l-2 border-transparent hover:border-amber-500"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left py-4 px-4 text-white/90 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium uppercase tracking-wider border-l-2 border-transparent hover:border-amber-500"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-4 px-4 text-white/90 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium uppercase tracking-wider border-l-2 border-transparent hover:border-amber-500"
            >
              Contacto
            </button>
          </nav>

          {/* Footer of sidebar */}
          <div className="pt-6 border-t border-white/10">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full bg-transparent border-white/20 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
            <p className="text-white/40 text-xs text-center mt-6">
              © 2025 Zegers Propiedades
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
