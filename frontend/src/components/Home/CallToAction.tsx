import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const CallToAction: React.FC = () => (
  <section className="text-center py-12">
    <h2 className="text-3xl font-space font-bold mb-4">
      Ready to Explore Space?
    </h2>
    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
      Dive into NASA's treasure trove of space data, from breathtaking images of distant galaxies
      to real-time tracking of near-Earth objects. Start your cosmic adventure today!
    </p>
    <Link
      to="/apod"
      className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
    >
      <Rocket className="w-5 h-5" />
      <span>Launch Explorer</span>
    </Link>
  </section>
);

export default CallToAction; 