import React from 'react';

interface EPICHeaderProps {
  title: string;
  subtitle: string;
}

const EPICHeader: React.FC<EPICHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-space font-bold mb-4 bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default EPICHeader; 