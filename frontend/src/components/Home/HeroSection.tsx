import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Satellite } from 'lucide-react';

const HeroSection: React.FC = () => (
  <section className="text-center py-16">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-space font-bold mb-6 bg-gradient-to-r from-nasa-blue via-cosmic-purple to-nasa-red bg-clip-text text-transparent animate-float">
        NASA Explorer
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
        Embark on a cosmic journey through NASA's vast collection of space data,
        stunning imagery, and real-time information from our solar system and beyond.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/apod"
          className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2 min-w-[220px]"
        >
          <Camera className="w-5 h-5" />
          <span>Start Exploring</span>
        </Link>
        <a
          href="https://api.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2 min-w-[220px]"
        >
          <Satellite className="w-5 h-5" />
          <span>NASA APIs</span>
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection; 