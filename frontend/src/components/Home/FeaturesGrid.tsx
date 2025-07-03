import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Camera, Globe, Star } from 'lucide-react';

const features = [
  {
    title: 'Astronomy Picture of the Day',
    description: 'Discover stunning space images with detailed explanations from NASA\'s daily featured photograph.',
    icon: <Camera className="w-8 h-8" />,
    path: '/apod',
    color: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Mars Rover Photos',
    description: 'Explore the Red Planet through the eyes of NASA\'s Mars rovers with thousands of high-resolution images.',
    icon: <Rocket className="w-8 h-8" />,
    path: '/mars-rover',
    color: 'from-red-500 to-orange-600'
  },
  {
    title: 'Near Earth Objects',
    description: 'Track asteroids and comets that come close to Earth with real-time data and visualizations.',
    icon: <Star className="w-8 h-8" />,
    path: '/neo',
    color: 'from-yellow-500 to-red-600'
  },
  {
    title: 'EPIC Earth Images',
    description: 'View stunning images of Earth from NASA\'s EPIC camera aboard the DSCOVR satellite.',
    icon: <Globe className="w-8 h-8" />,
    path: '/epic',
    color: 'from-teal-500 to-cyan-600'
  }
];

const FeaturesGrid: React.FC = () => (
  <section>
    <h2 className="text-3xl md:text-4xl font-space font-bold text-center mb-12">
      Explore the Universe
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Link
          key={index}
          to={feature.path}
          className="card group hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-nasa-blue transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {feature.description}
          </p>
          <div className="mt-4 text-nasa-blue font-medium group-hover:text-nasa-red transition-colors">
            Explore →
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default FeaturesGrid; 