import React from 'react';
import { TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import { Asteroid } from '../../types/neo';
import { Card } from '../UI';

interface NEOStatsProps {
  asteroids: Asteroid[];
  hazardousAsteroids: Asteroid[];
}

const NEOStats: React.FC<NEOStatsProps> = ({ asteroids, hazardousAsteroids }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
      <Card className="text-center w-full">
        <div className="text-3xl font-bold text-nasa-blue mb-2">{asteroids.length}</div>
        <div className="text-gray-400">Total Asteroids</div>
        <TrendingUp className="w-8 h-8 mx-auto mt-2 text-nasa-blue" />
      </Card>

      <Card className="text-center w-full">
        <div className="text-3xl font-bold text-red-500 mb-2">{hazardousAsteroids.length}</div>
        <div className="text-gray-400">Potentially Hazardous</div>
        <AlertTriangle className="w-8 h-8 mx-auto mt-2 text-red-500" />
      </Card>

      <Card className="text-center w-full">
        <div className="text-3xl font-bold text-yellow-500 mb-2">
          {asteroids.length > 0 ? ((hazardousAsteroids.length / asteroids.length) * 100).toFixed(1) : '0'}%
        </div>
        <div className="text-gray-400">Hazardous Percentage</div>
        <BarChart3 className="w-8 h-8 mx-auto mt-2 text-yellow-500" />
      </Card>

      <Card className="text-center w-full">
        <div className="text-3xl font-bold text-green-500 mb-2">
          {asteroids.length > 0 ? (asteroids.length - hazardousAsteroids.length) : 0}
        </div>
        <div className="text-gray-400">Safe Asteroids</div>
        <div className="w-8 h-8 mx-auto mt-2 text-green-500">✓</div>
      </Card>
    </div>
  );
};

export default NEOStats; 