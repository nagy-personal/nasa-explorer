import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import { Rocket } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-nasa-blue/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-nasa-blue rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-nasa-blue animate-pulse" />
            </div>
          </div>
        </div>
        <div className="text-white text-lg font-medium mb-2">
          {loadingMessage || 'Loading...'}
        </div>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-nasa-blue rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-nasa-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 