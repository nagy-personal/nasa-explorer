import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: ''
  };

  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-700 shadow-lg ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 