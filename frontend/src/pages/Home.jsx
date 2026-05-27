import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProperties from '../components/FeaturedProperties';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CitySelector from '../components/CitySelector';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <CitySelector onCitySelect={setSelectedCity} activeCity={selectedCity} />
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
