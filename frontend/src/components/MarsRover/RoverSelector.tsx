import React from 'react';
import { Rover } from '../../types/marsRover';
import { Card } from '../UI';

interface RoverSelectorProps {
  rovers: Rover[];
  selectedRover: string;
  onRoverSelect: (roverName: string) => void;
  roverNames: string[];
}

const RoverSelector: React.FC<RoverSelectorProps> = ({
  rovers,
  selectedRover,
  onRoverSelect,
  roverNames,
}) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 text-white">Select Rover</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roverNames.map((roverName) => {
          const rover = rovers.find(r => r.name.toLowerCase() === roverName);
          return (
            <button
              key={roverName}
              onClick={() => onRoverSelect(roverName)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedRover === roverName
                  ? 'border-nasa-red bg-red-900/20 text-white'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
              }`}
            >
              <div className="text-base sm:text-lg font-bold capitalize mb-2 break-words">{roverName}</div>
              {rover && (
                <div className="text-sm text-gray-400">
                  <div>Status: {rover.status}</div>
                  <div>Photos: {rover.total_photos.toLocaleString()}</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default RoverSelector; 