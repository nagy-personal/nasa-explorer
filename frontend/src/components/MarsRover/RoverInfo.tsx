import React from 'react';
import { Rover } from '../../types/marsRover';
import { Card } from '../UI';

interface RoverInfoProps {
  rover: Rover;
  formatDate: (dateString: string) => string;
}

const RoverInfo: React.FC<RoverInfoProps> = ({ rover, formatDate }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 text-white">
        {rover.name.toUpperCase()} Rover Information
      </h3>
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <span className="font-semibold text-white">Landing Date:</span>
          <div className="text-gray-400">{formatDate(rover.landing_date)}</div>
        </div>
        <div>
          <span className="font-semibold text-white">Launch Date:</span>
          <div className="text-gray-400">{formatDate(rover.launch_date)}</div>
        </div>
        <div>
          <span className="font-semibold text-white">Status:</span>
          <div className="text-gray-400 capitalize">{rover.status}</div>
        </div>
        <div>
          <span className="font-semibold text-white">Total Photos:</span>
          <div className="text-gray-400">{rover.total_photos.toLocaleString()}</div>
        </div>
        <div>
          <span className="font-semibold text-white">Max Sol:</span>
          <div className="text-gray-400">{rover.max_sol}</div>
        </div>
        <div>
          <span className="font-semibold text-white">Max Date:</span>
          <div className="text-gray-400">{formatDate(rover.max_date)}</div>
        </div>
      </div>
    </Card>
  );
};

export default RoverInfo; 