import React from 'react';

interface NEOHeaderProps {
  title: string;
  subtitle: string;
}

const NEOHeader: React.FC<NEOHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-space font-bold mb-4 bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default NEOHeader; 