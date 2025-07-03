import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Asteroid } from '../../types/neo';
import { Card, Button } from '../UI';

interface NEOListProps {
  asteroids: Asteroid[];
  formatDistance: (distance: string) => string;
  formatDate: (dateString: string) => string;
}

const NEOList: React.FC<NEOListProps> = ({ asteroids, formatDistance, formatDate }) => {
  if (asteroids.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No asteroids found for the selected date range.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6 text-white">Asteroid Details</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {asteroids.map((asteroid) => (
          <div
            key={asteroid.id}
            className={`p-4 rounded-lg border ${
              asteroid.is_potentially_hazardous_asteroid
                ? 'border-red-500 bg-red-900/20'
                : 'border-gray-600 bg-gray-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-white">{asteroid.name}</h4>
                  {asteroid.is_potentially_hazardous_asteroid && (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-white">Diameter:</span>
                    <div className="text-gray-400">
                      {(asteroid.estimated_diameter.kilometers.estimated_diameter_min * 1000).toFixed(0)} - {(asteroid.estimated_diameter.kilometers.estimated_diameter_max * 1000).toFixed(0)} m
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Velocity:</span>
                    <div className="text-gray-400">
                      {parseFloat(asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second || '0').toFixed(2)} km/s
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Closest Approach:</span>
                    <div className="text-gray-400">
                      {formatDate(asteroid.close_approach_data[0]?.close_approach_date || '')}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Distance:</span>
                    <div className="text-gray-400">
                      {formatDistance(asteroid.close_approach_data[0]?.miss_distance.astronomical || '0')}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                icon={ExternalLink}
                onClick={() => window.open(`https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${asteroid.id}`, '_blank')}
                className="ml-4"
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NEOList; 