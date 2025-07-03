import React from 'react';

interface MarsRoverHeaderProps {
  title: string;
  subtitle: string;
}

const MarsRoverHeader: React.FC<MarsRoverHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-space font-bold mb-4 bg-gradient-to-r from-nasa-red to-orange-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default MarsRoverHeader; 