import React from 'react';

const StatsSection: React.FC = () => (
  <section className="bg-gray-800/50 rounded-2xl p-8">
    <h2 className="text-3xl font-space font-bold text-center mb-8">
      NASA by the Numbers
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <div className="text-3xl md:text-4xl font-bold text-nasa-blue mb-2">140K+</div>
        <div className="text-gray-400">Images Available</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-cosmic-purple mb-2">25K+</div>
        <div className="text-gray-400">Asteroids Tracked</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-nasa-red mb-2">4</div>
        <div className="text-gray-400">Mars Rovers</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-stellar-yellow mb-2">24/7</div>
        <div className="text-gray-400">Real-time Data</div>
      </div>
    </div>
  </section>
);

export default StatsSection; 