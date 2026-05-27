import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProperties from '../components/FeaturedProperties';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="min-h-screen relative">
      {/* Global gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50/40 to-white -z-10"></div>
      
      {/* Decorative floating elements */}
      <div className="fixed top-1/4 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      
      <Header />
      <Hero onCitySelect={setSelectedCity} activeCity={selectedCity} />
      <FeaturedProperties cityFilter={selectedCity} />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
